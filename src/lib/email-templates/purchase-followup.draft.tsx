/**
 * BROUILLON — courriel de suivi après achat (« Tu as réussi à ouvrir
 * ton PDF ? »), préparé le 22 octobre 2026 dans le cadre des
 * recommandations service client d'Hugo (reco nº 3 du panel des 50).
 *
 * ⚠️ NON ACTIVÉ : ce gabarit n'est PAS inscrit au registre
 * (src/lib/email-templates/registry.ts) et aucun code ne l'appelle.
 * Il ne partira jamais tant qu'Hugo n'aura pas donné un go séparé
 * pour l'envoi de courriels de suivi. Pour l'activer un jour, il
 * faudrait : (1) le renommer sans « .draft », (2) l'inscrire au
 * registre, (3) l'appeler avec un déclencheur et une clé
 * d'idempotence — trois gestes qui exigent l'accord explicite d'Hugo.
 */
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

interface PurchaseFollowupProps {
  title?: string
  siteOrigin?: string
}

const PurchaseFollowupEmail = ({
  title = '',
  siteOrigin = '',
}: PurchaseFollowupProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Tu as réussi à ouvrir ton PDF {SITE_NAME} ?</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Tu as réussi à ouvrir ton PDF ?</Heading>
        <Text style={text}>
          Bonjour — c'est Hugo, de {SITE_NAME}. Merci encore pour ton
          achat de <strong>{title}</strong>. Petit suivi humain, comme
          promis : est-ce que ton fichier s'est bien ouvert ?
        </Text>
        <Text style={text}>
          Si ça coince, deux portes toutes simples :
        </Text>
        <Section style={card}>
          <Text style={itemTitle}>1. Récupérer ton achat</Text>
          <Text style={text}>
            Ton lien de téléchargement est valide 7 jours. Passé ce
            délai, ou si le courriel s'est perdu, la page « Récupérer
            mon achat » t'en renvoie un nouveau :
          </Text>
          <Link href={`${siteOrigin}/recuperer-achat`} style={button}>
            Récupérer mon achat →
          </Link>
        </Section>
        <Section style={card}>
          <Text style={itemTitle}>2. M'écrire directement</Text>
          <Text style={text}>
            Réponds à ce courriel, ou écris à{' '}
            <Link href="mailto:hpoutils.admin@gmail.com" style={link}>
              hpoutils.admin@gmail.com
            </Link>{' '}
            — une réponse d'Hugo, pas d'un robot, sous 48 h ouvrables.
          </Text>
        </Section>
        <Text style={text}>
          Et si c'est une panne technique de mon côté — un fichier qui
          ne s'ouvre pas, un lien mort, le mauvais fichier — je répare
          ou je rembourse, comme le disent les conditions de vente. Tu
          ne paies jamais pour quelque chose que tu n'as pas pu
          recevoir.
        </Text>
        <Text style={footer}>— Hugo, {SITE_NAME}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PurchaseFollowupEmail,
  subject: (data: Record<string, any>) =>
    `Tu as réussi à ouvrir ton PDF ? — ${data.title ?? SITE_NAME}`,
  displayName: 'Suivi après achat (BROUILLON — non activé)',
  previewData: {
    title: 'Guide PDF — exemple',
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
const link = { color: '#b04a2f' }
const footer = { fontSize: '14px', color: '#444', margin: '24px 0 0' }
