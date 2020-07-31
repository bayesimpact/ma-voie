import React, {useCallback, useState} from 'react'
import {useTranslation, Trans} from 'react-i18next'
import {Link} from 'react-router-dom'

import {Page, getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'
import Tab from 'components/tab'

import logoChance from 'images/logo-chance.svg'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const buttonWrapperStyle: React.CSSProperties = {
  padding: '10px 20px 0',
}
const paragrapheStyle: React.CSSProperties = {
  fontSize: 14,
  padding: '0 20px',
}
const partnerContainerStyle: React.CSSProperties = {
  borderBottom: `2px solid ${colors.SILVER_TWO}`,
  color: colors.DARK_FOREST_GREEN,
  width: '100%',
}
const partnerHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '23px 0 15px',
  width: '100%',
}
const partnerHeaderNameStyle: React.CSSProperties = {
  flex: '1',
  fontFamily: 'Lato, Helvetica',
  fontSize: 15,
}
const partnerHeaderMoreStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 'bold',
}
const partnerDetailsStyle: React.CSSProperties = {
}
const partnerTitleStyle: React.CSSProperties = {
  display: 'flex',
  marginBottom: 10,
}
const partnerTitleLogoStyle: React.CSSProperties = {
  height: 62,
  width: 62,
}
const partnerTitleNameStyle: React.CSSProperties = {
  flex: '1',
  fontSize: 18,
  paddingLeft: 20,
}
const partnerTitleNameNameStyle: React.CSSProperties = {
  fontWeight: 'bold',
}
const partnerTitleNameSubNameStyle: React.CSSProperties = {
  textTransform: 'uppercase',
}
const partnerDescriptionStyle: React.CSSProperties = {
  borderTop: 10,
  fontSize: 14,
}

const imageStyle: React.CSSProperties = {
  border: `1px solid ${colors.SILVER_THREE}`,
  borderRadius: '50%',
  height: 60,
  width: 60,
}
const buttonsContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px 0',
  width: '100%',
}
const partnerButtonStyle: React.CSSProperties = {
  width: 150,
}
const partners = [
  {
    chooseLink: '',
    description: 'Ce cours en ligne* "Focus compétences" est composé de 4 séquences :\r\n\
    1. Définir la notion de compétences\
    2. Acquérir une méthodologie pour identifier ses compétences\
    3. Valoriser ses compétences auprès d\'un recruteur\
    4. Augmenter sa visibilité et sa crédibilité sur les réseaux sociaux\
    Chaque séquence est composée de vidéos, quiz, et de ressources complémentaires**.\
    Vous pouvez suivre chaque séquence à votre rythme et selon vos besoins.',
    discoverLink: '',
    icon: logoChance,
    name: 'Externe 1',
    subName: 'MOOC',
  },
  {
    chooseLink: '',
    description: 'Ce cours en ligne* "Focus compétences" est composé de 4 séquences :\
    1. Définir la notion de compétences\
    2. Acquérir une méthodologie pour identifier ses compétences\
    3. Valoriser ses compétences auprès d\'un recruteur\
    4. Augmenter sa visibilité et sa crédibilité sur les réseaux sociaux\
    Chaque séquence est composée de vidéos, quiz, et de ressources complémentaires**.\
    Vous pouvez suivre chaque séquence à votre rythme et selon vos besoins.',
    discoverLink: '',
    icon: logoChance,
    name: 'Externe 2',
    subName: 'MOOC',
  },
]

interface TabsProps {
  redirect: Page
  text: JSX.Element
}
const tabs: TabsProps[] = [
  {
    redirect: 'DEFINITION_PARTNERS_INTERNAL',
    text: <Trans>Certifiés par Ma Voie</Trans>,
  },
  {
    redirect: 'DEFINITION_PARTNERS_EXTERNAL',
    text: <Trans>Autres partenaires</Trans>,
  },
]

interface ExternalPartnerProps {
  index: number
  open: null|number
  onSelect: (index: number) => void
  partner: {
    chooseLink: string
    description: string
    discoverLink: string
    icon: string
    name: string
    subName: string
  }
}
const _ExternalPartner = ({
  index, open, onSelect, partner,
}: ExternalPartnerProps): React.ReactElement => {

  const [t] = useTranslation()
  const isOpen = (index === open)
  const finalPartnerDetailsStyle = {
    display: isOpen ? 'block' : 'none',
    ...partnerDetailsStyle,
  }
  const handleOpen = useCallback((): void => {
    onSelect(index)
  }, [index, onSelect])


  return <div key={index} style={partnerContainerStyle}>
    <div style={partnerHeaderStyle}>
      <div style={partnerHeaderNameStyle}>{`Partenaire ${partner.name}`}
      </div>
      <div style={partnerHeaderMoreStyle} onClick={handleOpen}>
        {isOpen ? '-' : '+'}
      </div>
    </div>
    <div style={finalPartnerDetailsStyle}>
      <div style={partnerTitleStyle}>
        <div style={partnerTitleLogoStyle}>
          <img src={partner.icon} alt="logo" style={imageStyle} />
        </div>
        <div style={partnerTitleNameStyle}>
          <div style={partnerTitleNameNameStyle}>
            {partner.name}
          </div>
          <div style={partnerTitleNameSubNameStyle}>
            {partner.subName}
          </div>
        </div>
      </div>
      <div style={partnerDescriptionStyle}>
        {partner.description}
      </div>
      <div style={buttonsContainerStyle}>
        <div style={partnerButtonStyle}>
          <Link to={getPath('DEFINITION_WHAT', t)} style={linkStyle}>
            <Button color={colors.DARK_FOREST_GREEN}>
              {t('Découvrir')}
            </Button>
          </Link>
        </div>
        <div style={partnerButtonStyle}>
          <Link to={getPath('DEFINITION_WHAT', t)} style={linkStyle}>
            <Button bgColor={colors.REDDISH_ORANGE}>
              {t('Choisir')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const DefinitionPartnersExternalPage = (): React.ReactElement => {
  const [t] = useTranslation()
  const bigTitle = t('Voici les partenaires idéaux pour vous aider')
  const [open, setOpen] = useState<null|number>(null)

  const onSelect = useCallback((index: number): void => {
    if (open === index) {
      setOpen(null)
    } else {
      setOpen(index)
    }
  }, [open])

  // FIXME(émilie): Change links to redirect where it is needed
  return <Layout header={t('Définition')} bigTitle={bigTitle}>
    <Tab tabs={tabs} selectedTab={1} />
    {partners.map((partner, index) => {
      return <_ExternalPartner
        key={index} index={index} partner={partner}
        open={open} onSelect={onSelect} />
    })}
    <Trans parent="p" style={paragrapheStyle}>
      Si vous pensez avoir déjà réussi cette étape, cliquez sur
      "Je l'ai fait moi-même" pour passer à l'étape suivante.
    </Trans>
    <div style={buttonWrapperStyle}>
      <Link to={getPath('DEFINITION_WHAT', t)} style={linkStyle}>
        <Button color={colors.TURQUOISE_BLUE}>
          {t('Je l\'ai fait moi-même')}
        </Button>
      </Link>
    </div>
  </Layout>
}

export default React.memo(DefinitionPartnersExternalPage)
