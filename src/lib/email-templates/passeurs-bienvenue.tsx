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

interface PasseursBienvenueProps {
  /** Ex. « 3 $ CAD par mois » ou « 28 $ CAD par année ». */
  formuleLabel?: string
  /** Lien d'annulation en 1 clic, personnel et unique. */
  lienAnnulation?: string
  /** Fin de la période en cours, ex. « 30 novembre 2026 ». */
  dateFinPeriode?: string
}

const PasseursBienvenueEmail = ({
  formuleLabel = '',
  lienAnnulation = '',
  dateFinPeriode = '',
}: PasseursBienvenueProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Bienvenue parmi les Passeurs — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Bienvenue parmi les Passeurs</Heading>
        <Text style={text}>
          Merci ! Votre abonnement ({formuleLabel}) est actif. Vous recevrez
          les feuilles Passeurs au fur et à mesure de leur parution — les
          outils gratuits d'HP restent gratuits pour tout le monde.
        </Text>
        <Text style={text}>
          <strong>Votre lien d'annulation en 1 clic</strong> — gardez ce
          courriel précieusement. Si un jour vous voulez arrêter, un seul
          clic suffit, sans courriel à rédiger, sans questionnaire :
        </Text>
        <Text style={text}>
          <Link href={lienAnnulation} style={button}>
            Annuler mon abonnement en 1 clic →
          </Link>
        </Text>
        <Text style={text}>
          L'annulation prend effet à la fin de la période déjà payée
          {dateFinPeriode ? ` (en ce moment : ${dateFinPeriode})` : ''}, sans
          frais ni pénalité. Vous gardez l'accès aux feuilles parues
          jusqu'à cette date.
        </Text>
        <Text style={text}>
          Une question ? Écrivez à la direction humaine : une personne vous
          répond sous 3 jours ouvrables.
        </Text>
        <Text style={footer}>
          HP Outils — des outils concrets pour la vraie vie. Aucune taxe
          ajoutée : petit fournisseur, la TPS et la TVQ ne sont pas perçues.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PasseursBienvenueEmail,
  subject: `Bienvenue parmi les Passeurs — ${SITE_NAME}`,
  displayName: 'Bienvenue Passeurs',
  previewData: {
    formuleLabel: '3 $ CAD par mois',
    lienAnnulation: 'https://www.hp-outils.com/passeurs/annuler/jeton-exemple',
    dateFinPeriode: '30 novembre 2026',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: 560 }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#444', lineHeight: '1.6', margin: '0 0 20px' }
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
