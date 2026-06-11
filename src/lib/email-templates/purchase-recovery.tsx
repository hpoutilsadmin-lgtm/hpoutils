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

interface PurchaseItem {
  title: string
  downloadUrl: string
  purchasedAt: string
}

interface PurchaseRecoveryProps {
  items?: PurchaseItem[]
  siteOrigin?: string
}

const PurchaseRecoveryEmail = ({
  items = [],
  siteOrigin = '',
}: PurchaseRecoveryProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Vos liens de téléchargement {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Vos liens de téléchargement</Heading>
        <Text style={text}>
          Voici les liens de téléchargement associés à votre courriel. Chaque
          lien est valide 7 jours. Vous pouvez revenir sur la page «&nbsp;Récupérer
          mon achat&nbsp;» à tout moment pour en générer de nouveaux.
        </Text>
        {items.length === 0 ? (
          <Text style={text}>
            Aucun achat trouvé pour ce courriel.
          </Text>
        ) : (
          items.map((it, idx) => (
            <Section key={idx} style={card}>
              <Text style={itemTitle}>{it.title}</Text>
              <Text style={itemMeta}>
                Acheté le{' '}
                {new Date(it.purchasedAt).toLocaleDateString('fr-CA')}
              </Text>
              <Link href={`${siteOrigin}${it.downloadUrl}`} style={button}>
                Télécharger →
              </Link>
            </Section>
          ))
        )}
        <Text style={footer}>— L'équipe {SITE_NAME}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PurchaseRecoveryEmail,
  subject: `Vos liens de téléchargement ${SITE_NAME}`,
  displayName: 'Récupération d\'achat',
  previewData: {
    siteOrigin: 'https://www.hp-outils.com',
    items: [
      {
        title: 'Guide PDF — exemple',
        downloadUrl: '/api/public/download-pdf?token=example',
        purchasedAt: new Date().toISOString(),
      },
    ],
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
const itemTitle = { fontSize: '15px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px' }
const itemMeta = { fontSize: '12px', color: '#777', margin: '0 0 12px' }
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