import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'HP Outils'

interface NewsletterConfirmationProps {
  confirmUrl?: string
  siteOrigin?: string
}

// Double confirmation infolettre (§3.2 — lot sécurité 2, appliqué
// 12 nov. 2026, décision HP Q-S2-2 : OUI). Texte en VOUS, comme le reste
// du site. Si le destinataire n'a rien demandé, il ignore le courriel : le
// lien ne confirme rien d'autre que l'adresse qui l'a reçu.
const NewsletterConfirmationEmail = ({
  confirmUrl = '',
  siteOrigin = '',
}: NewsletterConfirmationProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Confirmez votre inscription — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirmez votre inscription</Heading>
        <Text style={text}>
          Vous avez demandé à recevoir les outils et nouveautés de{' '}
          {SITE_NAME} par courriel. Un dernier clic pour confirmer que cette
          adresse est bien la vôtre :
        </Text>
        <Link href={confirmUrl} style={button}>
          Confirmer mon inscription →
        </Link>
        <Text style={text}>
          Ce lien est valable 24 heures. Si vous n&apos;avez rien demandé,
          ignorez simplement ce courriel : rien ne sera inscrit.
        </Text>
        <Text style={footer}>
          {SITE_NAME} — Des outils pour la vraie vie. Désinscription en un
          clic à tout moment, depuis chaque courriel.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template: TemplateEntry = {
  component: NewsletterConfirmationEmail,
  subject: `Confirmez votre inscription — ${SITE_NAME}`,
  displayName: "Confirmation d'inscription à l'infolettre",
  previewData: {
    confirmUrl: 'https://www.hp-outils.com/confirmer-infolettre?token=exemple',
    siteOrigin: 'https://www.hp-outils.com',
  },
}

const main = { backgroundColor: '#fdf8ef', fontFamily: 'Georgia, serif' }
const container = { maxWidth: 560, margin: '0 auto', padding: '32px 24px' }
const h1 = { fontSize: 26, color: '#2a1a12' }
const text = { fontSize: 16, lineHeight: 1.6, color: '#2a1a12' }
const button = {
  display: 'inline-block',
  backgroundColor: '#b04a2f',
  color: '#fff',
  padding: '10px 18px',
  borderRadius: 6,
  textDecoration: 'none',
  fontWeight: 'bold' as const,
}
const footer = { fontSize: 14, color: '#6b5b4a', marginTop: 24 }
