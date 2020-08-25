import Partners from './partners.json'
import {StepId} from './steps'

export interface Props {
  details?: string
  description?: string
  discoverUrl?: string
  isInternal?: boolean
  logo: string
  name: string
  partnerId: string
  steps: readonly StepId[]
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
    steps: steps as readonly StepId[],
  }))

export default PartnersWithAssets
