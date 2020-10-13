import {useMemo} from 'react'
import {useFirestoreConnect} from 'react-redux-firebase'

import {useSelector} from 'store/selections'

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

interface StaticProps extends Omit<Props, 'steps'> {
  steps: readonly string[]
}

const overridePartnerUrls = JSON.parse(config.partnerUrls)

const addAssets = ({logo, partnerId, steps, url, ...partner}: StaticProps): Props => ({
  ...partner,
  // Add logos in the /assets/logo folder when adding new ones.
  logo: `${config.canonicalUrl}/assets/logo/${logo}`,
  partnerId,
  // TODO(pascal): Try to avoid this type cast.
  steps: steps as readonly bayes.maVoie.StepId[],
  url: overridePartnerUrls[partnerId] || url,
})

const usePartners = (): readonly Readonly<Props>[] => {
  useFirestoreConnect('staticPartners')
  const fromFirebase: undefined|readonly StaticProps[] =
    useSelector(({firestore}) => firestore.ordered.staticPartners)
  return useMemo(
    () => (fromFirebase?.length ? fromFirebase : Partners).map(addAssets),
    [fromFirebase])
}

export default usePartners
