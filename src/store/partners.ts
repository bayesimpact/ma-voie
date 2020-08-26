import Partners from './partners.json'

export interface Props {
  details?: string
  description?: string
  discoverUrl?: string
  isInternal?: boolean
  logo: string
  name: string
  partnerId: string
  steps: readonly bayes.maVoie.StepId[]
  title?: string
  url: string
  userCount?: number
}

const PartnersWithAssets: readonly Readonly<Props>[] = Partners.
  map(({logo, steps, ...partner}) => ({
    ...partner,
    // Add logos in the /assets/logo folder when adding new ones.
    logo: `${config.canonicalUrl}/assets/logo/${logo}`,
    // TODO(pascal): Try to avoid this type cast.
    steps: steps as readonly bayes.maVoie.StepId[],
  }))

export default PartnersWithAssets
