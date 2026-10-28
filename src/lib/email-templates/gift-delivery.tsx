// Courriel de livraison d'un bon cadeau — même style que purchase-delivery.
// Nouveau modèle à enregistrer dans src/lib/email-templates/registry.ts :
//   import { template as giftDelivery } from './gift-delivery'
//   'gift-delivery': giftDelivery,
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'HP Outils'

interface GiftDeliveryProps {
  title?: string
  code?: string
  amountLabel?: string
  siteOrigin?: string
}

const GiftDeliveryEmail = ({
  title = '',
  code = '',
  amountLabel = '',
  siteOrigin = '',
}: GiftDeliveryProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Ton bon cadeau {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Merci pour ton achat</Heading>
        <Text style={text}>
          Voici ton bon cadeau <strong>{title}</strong> — {amountLabel}.
          Offre-le à qui tu veux : la personne saisit ce code au panier,
          et le montant s'applique à son achat.
        </Text>
        <Text style={codeStyle}>{code}</Text>
        <Text style={text}>
          Le code se dépense par tranches : s'il reste du solde après un
          achat, le reste demeure sur le même code. Conserve ce courriel.
          Une question ? Écris à la direction humaine — la direction humaine répond sous 3 jours ouvrables.
        </Text>
        <Text style={footer}>— L'équipe {SITE_NAME}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: GiftDeliveryEmail,
  subject: () => `Ton bon cadeau — ${SITE_NAME}`,
  displayName: 'Livraison de bon cadeau',
  previewData: {
    title: 'Bon cadeau HP Outils',
    code: 'HP-XXXX-XXXX-XXXX',
    amountLabel: '20 $ CAD',
    siteOrigin: 'https://www.hp-outils.com',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: 560 }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#444', lineHeight: '1.6', margin: '0 0 20px' }
const codeStyle = {
  fontSize: '22px',
  fontWeight: 'bold',
  letterSpacing: '2px',
  textAlign: 'center' as const,
  padding: '16px',
  border: '1px solid #e0d8cf',
  borderRadius: '4px',
  margin: '0 0 20px',
}
const footer = { fontSize: '12px', color: '#999', margin: '24px 0 0' }
