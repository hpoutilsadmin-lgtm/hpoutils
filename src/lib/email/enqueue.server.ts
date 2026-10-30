import * as React from 'react'
import { render } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'hpoutils'
const SENDER_DOMAIN = 'notify.hp-outils.com'
const FROM_DOMAIN = 'hp-outils.com'

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Server-side helper to enqueue a transactional email without going through
 * the /lovable/email/transactional/send route (which requires a user JWT).
 * Use this from server functions invoked by unauthenticated public actions.
 * Never throws, so callers can keep their response neutral — but it
 * RETURNS whether the message was actually queued (B-W2) : true only
 * when the enqueue RPC succeeded. Any other outcome (env manquant,
 * gabarit inconnu, adresse supprimée/désinscrite, jeton en échec,
 * RPC en échec) renvoie false. Les appelants qui marquent une
 * livraison comme faite DOIVENT vérifier ce booléen : un false ne
 * doit jamais devenir un delivery_sent_at.
 */
export async function enqueueTransactionalEmail(params: {
  templateName: string
  recipientEmail: string
  idempotencyKey: string
  templateData?: Record<string, any>
}): Promise<boolean> {
  const supabaseUrl = process.env.SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  if (!supabaseUrl || !serviceKey) {
    console.error('enqueueTransactionalEmail: missing env')
    return false
  }
  const supabase = createClient(supabaseUrl, serviceKey)

  const template = TEMPLATES[params.templateName]
  if (!template) {
    console.error('enqueueTransactionalEmail: unknown template', params.templateName)
    return false
  }
  const recipient = (template.to || params.recipientEmail).toLowerCase()

  // Suppression check
  const { data: suppressed } = await supabase
    .from('suppressed_emails')
    .select('id')
    .eq('email', recipient)
    .maybeSingle()
  if (suppressed) return false

  // Unsubscribe token (one per recipient)
  const { data: existing } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token, used_at')
    .eq('email', recipient)
    .maybeSingle()

  let unsubscribeToken: string
  if (existing && !existing.used_at) {
    unsubscribeToken = existing.token
  } else if (existing && existing.used_at) {
    return false // already unsubscribed
  } else {
    unsubscribeToken = generateToken()
    const { error } = await supabase
      .from('email_unsubscribe_tokens')
      .insert({ email: recipient, token: unsubscribeToken })
    if (error) {
      console.error('enqueueTransactionalEmail: token insert failed', error)
      return false
    }
  }

  const data = params.templateData || {}
  const element = React.createElement(template.component, data)
  const html = await render(element)
  const text = await render(element, { plainText: true })
  const subject =
    typeof template.subject === 'function' ? template.subject(data) : template.subject

  const messageId = crypto.randomUUID()
  await supabase.from('email_send_log').insert({
    message_id: messageId,
    template_name: params.templateName,
    recipient_email: recipient,
    status: 'pending',
  })

  const { error: enqueueError } = await supabase.rpc('enqueue_email', {
    queue_name: 'transactional_emails',
    payload: {
      message_id: messageId,
      to: recipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject,
      html,
      text,
      purpose: 'transactional',
      label: params.templateName,
      idempotency_key: params.idempotencyKey,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  })
  if (enqueueError) {
    console.error('enqueueTransactionalEmail: enqueue failed', enqueueError)
    // B-W2 (journal) : la ligne 'pending' déjà insérée ci-dessus ne
    // doit pas rester 'pending' — elle devient 'failed', sinon le
    // journal laisse croire qu'un envoi est en cours. On met à jour
    // la ligne existante (même message_id) au lieu d'en ajouter une
    // seconde, pour garder un seul état par message.
    const { error: logError } = await supabase
      .from('email_send_log')
      .update({ status: 'failed', error_message: 'Failed to enqueue email' })
      .eq('message_id', messageId)
    if (logError) {
      console.error('enqueueTransactionalEmail: failed-log update failed', logError)
    }
    return false
  }
  return true
}