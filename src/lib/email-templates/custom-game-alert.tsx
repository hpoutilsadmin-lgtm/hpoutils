import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'HP Outils'

/**
 * Alerte interne — commande de jeu sur mesure payée (LOT-ALERTE-EXPRESS,
 * 22 nov. 2026).
 *
 * Le sur-mesure n'a AUCUN courriel automatique au client (emailItems vide
 * par conception, livraison manuelle par la direction humaine) : cette
 * alerte est le seul signal qu'une commande attend sa livraison. Elle
 * part via le même circuit transactionnel que les livraisons (file
 * transactional_emails, journal email_send_log), avec la même clé
 * d'idempotence par session Stripe.
 *
 * Destinataire FIXE (template.to) : hpoutils.admin@gmail.com — la
 * direction humaine. Aucun courriel au client, aucun changement de prix.
 */
interface CustomGameAlertProps {
  level?: string
  amount?: string
  buyerEmail?: string
  sessionId?: string
  orderId?: string
  paidAt?: string
  siteOrigin?: string
}

const CustomGameAlertEmail = ({
  level = '',
  amount = '',
  buyerEmail = 'non fourni',
  sessionId = '',
  orderId = '',
  paidAt = '',
  siteOrigin = 'https://www.hp-outils.com',
}: CustomGameAlertProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>
      {`ALERTE — Jeu sur mesure ${level} payé (${amount}) : livraison manuelle à faire`}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          Commande de jeu sur mesure payée — livraison manuelle à faire
        </Heading>
        <Text style={text}>
          Une commande de jeu sur mesure vient d&apos;être payée. Aucun
          courriel automatique n&apos;est parti au client : c&apos;est à la
          direction humaine de livrer le jeu par courriel (adresse du jeu +
          kit de partage).
        </Text>
        <Section style={card}>
          <Text style={row}>
            <strong>Niveau :</strong> {level}
          </Text>
          <Text style={row}>
            <strong>Montant payé :</strong> {amount}
          </Text>
          <Text style={row}>
            <strong>Courriel de l&apos;acheteur :</strong> {buyerEmail}
          </Text>
          <Text style={row}>
            <strong>ID de session Stripe :</strong> {sessionId}
          </Text>
          <Text style={row}>
            <strong>ID de commande :</strong> {orderId}
          </Text>
          <Text style={row}>
            <strong>Payé le :</strong> {paidAt}
          </Text>
        </Section>
        {sessionId && (
          <Section style={card}>
            <Link
              href={`${siteOrigin}/checkout/return?session_id=${encodeURIComponent(sessionId)}`}
              style={button}
            >
              Vérifier la commande →
            </Link>
          </Section>
        )}
        <Text style={text}>
          Livraison manuelle : envoyer à l&apos;acheteur l&apos;adresse de
          son jeu et le kit de partage, par courriel, depuis
          hpoutils.admin@gmail.com.
        </Text>
        <Text style={footer}>
          — Alerte automatique {SITE_NAME} (ne pas répondre : ce courriel est
          généré par le site).
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: CustomGameAlertEmail,
  subject: (data: Record<string, any>) =>
    `ALERTE — Jeu sur mesure ${data.level ?? ''} payé (${data.amount ?? ''}) : livraison manuelle à faire`,
  displayName: 'Alerte jeu sur mesure payé',
  /** Destinataire fixe : la direction humaine, jamais l'acheteur. */
  to: 'hpoutils.admin@gmail.com',
  previewData: {
    level: 'Express',
    amount: '19,00 $ CAD',
    buyerEmail: 'acheteur@exemple.ca',
    sessionId: 'cs_live_exemple',
    orderId: '00000000-0000-0000-0000-000000000000',
    paidAt: '2026-11-22T18:12:00.000Z',
    siteOrigin: 'https://www.hp-outils.com',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: 560 }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#444', lineHeight: '1.6', margin: '0 0 20px' }
const card = {
  padding: '16px',
  border: '1px solid #e0d8cf',
  borderRadius: '4px',
  marginBottom: '14px',
}
const row = { fontSize: '14px', color: '#444', lineHeight: '1.6', margin: '0 0 8px' }
const button = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#b04a2f',
  color: '#ffffff',
  borderRadius: '4px',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '14px',
}
const footer = { fontSize: '12px', color: '#999', margin: '24px 0 0' }
