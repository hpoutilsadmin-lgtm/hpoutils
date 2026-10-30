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

interface DeliveryItem {
  title?: string
  downloadUrl?: string
}

interface PurchaseDeliveryProps {
  title?: string
  downloadUrl?: string
  siteOrigin?: string
  /** Bundle « Choisis 10 kits parmi 15 » : un lien par kit choisi. */
  items?: DeliveryItem[]
  /** « Offrir » : le destinataire n'est pas l'acheteur. Le nom de l'offreur
   * n'est pas collecté à l'achat : le texte reste neutre, sans nom inventé. */
  isGift?: boolean
}

const PurchaseDeliveryEmail = ({
  title = '',
  downloadUrl = '',
  siteOrigin = '',
  items = [],
  isGift = false,
}: PurchaseDeliveryProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>{isGift ? `On vous offre ${title} — ${SITE_NAME}` : `Votre lien de téléchargement ${SITE_NAME}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{isGift ? 'On vous offre un cadeau' : 'Merci pour votre achat'}</Heading>
        {isGift && (
          <Text style={text}>
            Quelqu'un vous offre ce cadeau de {SITE_NAME}. Ce courriel vous
            est envoyé uniquement pour vous livrer ce cadeau — il ne vous
            inscrit à rien d'autre.
          </Text>
        )}
        {items.length > 0 ? (
          <>
            <Text style={text}>
              Voici vos liens de téléchargement — {items.length} article
              {items.length > 1 ? 's' : ''}. Chaque lien est valide 7
              jours. Conservez ce courriel — vous pouvez toujours revenir sur
              la page «&nbsp;Récupérer mon achat&nbsp;» pour en générer de
              nouveaux.
            </Text>
            {items.map((it, idx) => (
              <Section key={idx} style={card}>
                <Text style={itemTitle}>{it.title}</Text>
                <Link href={`${siteOrigin}${it.downloadUrl}`} style={button}>
                  Télécharger le PDF →
                </Link>
              </Section>
            ))}
          </>
        ) : (
          <>
            <Text style={text}>
              Voici votre lien de téléchargement pour <strong>{title}</strong>.
              Ce lien est valide 7 jours. Conservez ce courriel — vous pouvez
              toujours revenir sur la page «&nbsp;Récupérer mon achat&nbsp;» pour
              en générer un nouveau.
            </Text>
            <Section style={card}>
              <Text style={itemTitle}>{title}</Text>
              <Link href={`${siteOrigin}${downloadUrl}`} style={button}>
                Télécharger le PDF →
              </Link>
            </Section>
          </>
        )}
        <Text style={text}>
          Le PDF est filigrané avec votre courriel — il est destiné à un
          usage personnel.
        </Text>
        <Text style={footer}>— L'équipe {SITE_NAME}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PurchaseDeliveryEmail,
  subject: (data: Record<string, any>) =>
    data.isGift
      ? `On vous offre : ${data.title ?? SITE_NAME} — ${SITE_NAME}`
      : `Votre lien de téléchargement — ${data.title ?? SITE_NAME}`,
  displayName: 'Livraison d\'achat',
  previewData: {
    title: 'Guide PDF — exemple',
    downloadUrl: '/api/public/download-pdf?token=example',
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
const itemTitle = { fontSize: '15px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 12px' }
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