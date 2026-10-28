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

interface TomeDeliveryItem {
  title?: string
  readerUrl?: string
}

interface TomeDeliveryProps {
  title?: string
  items?: TomeDeliveryItem[]
  siteOrigin?: string
  /** « Offrir » : le destinataire n'est pas l'acheteur. Le nom de l'offreur
   * n'est pas collecté à l'achat : le texte reste neutre, sans nom inventé. */
  isGift?: boolean
}

const TomeDeliveryEmail = ({
  title = "À toi l'histoire",
  items = [],
  siteOrigin = '',
  isGift = false,
}: TomeDeliveryProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>{isGift ? `On vous offre ${title} — ${SITE_NAME}` : `Vos liens de lecture ${SITE_NAME}`}</Preview>
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
        <Text style={text}>
          Voici vos liens web personnels pour <strong>{title}</strong> — un
          lien par tome, à conserver. Chaque lien ouvre ton tome, sans
          compte, sans téléchargement.
        </Text>
        {items.map((it, idx) => (
          <Section key={idx} style={card}>
            <Text style={itemTitle}>{it.title}</Text>
            <Link href={`${siteOrigin}${it.readerUrl}`} style={button}>
              Lire →
            </Link>
          </Section>
        ))}
        <Text style={text}>
          Ton lien est personnel : il t'ouvre ton tome, quand tu veux. Si tu
          le perds, reviens sur la page «&nbsp;Lire&nbsp;» pour en recevoir
          de nouveaux par courriel.
        </Text>
        <Text style={text}>
          Une question ? La direction humaine te répond sous 3 jours
          ouvrables : hpoutils.admin@gmail.com.
        </Text>
        <Text style={footer}>— L'équipe {SITE_NAME}</Text>
      </Container>
    </Body>
  </Html>
)

export const template: TemplateEntry = {
  component: TomeDeliveryEmail,
  subject: (data: Record<string, any>) =>
    data.isGift
      ? `On vous offre « À toi l'histoire » — ${SITE_NAME}`
      : `Tes liens « À toi l'histoire » — ${SITE_NAME}`,
  displayName: "Livraison d'un tome",
  previewData: {
    title: "À toi l'histoire",
    items: [{ title: 'Debout!', readerUrl: '/lire/exemple' }],
    siteOrigin: 'https://www.hp-outils.com',
  },
}

const main = { backgroundColor: '#fdf8ef', fontFamily: 'Georgia, serif' }
const container = { maxWidth: 560, margin: '0 auto', padding: '32px 24px' }
const h1 = { fontSize: 26, color: '#2a1a12' }
const text = { fontSize: 16, lineHeight: 1.6, color: '#2a1a12' }
const card = { border: '1px solid #e5d9c3', borderRadius: 8, padding: '16px', margin: '16px 0' }
const itemTitle = { fontSize: 18, fontWeight: 'bold' as const, color: '#2a1a12' }
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
