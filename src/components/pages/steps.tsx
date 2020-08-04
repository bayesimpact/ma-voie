import ArrowDownIcon from 'mdi-react/ArrowDownIcon'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'

import {RootState} from 'store/actions'
import {prepareT} from 'store/i18n'
import {Page, getPath} from 'store/url'

import Layout from 'components/layout'
import CreateAccountPopup from 'components/create_account_popup'
import Step from 'components/step'
import competencesIcon from 'images/competences-ico.svg'
import definitionIcon from 'images/definition-ico.svg'
import formationIcon from 'images/formation-ico.svg'

const STEPS = [
  {
    color: colors.LIGHT_TAN,
    icon: definitionIcon,
    isOpen: true,
    redirect: 'DEFINITION_WHAT',
    title: prepareT('Définition de votre projet'),
  },
  {
    color: colors.SILVER,
    icon: competencesIcon,
    redirect: 'SKILLS_LIST',
    title: prepareT('Compétences'),
  },
  {
    color: colors.LIGHT_SKY_BLUE,
    icon: formationIcon,
    // TODO(émilie): put the good path when reviewed
    redirect: 'SKILLS_LIST',
    title: prepareT('Formations'),
  },
] as const
const stepsStyle: React.CSSProperties = {
  padding: '30px 0',
}
const arrowStyle: React.CSSProperties = {
  display: 'block',
  margin: '30px auto',
}
// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const StepsPage = (): React.ReactElement => {
  const [translate] = useTranslation()
  const history = useHistory()
  const [showPopup, setShowPopup] = useState(false)

  const name = useSelector(({user: {name}}: RootState) => name)
  const lastName = useSelector(({user: {lastName}}: RootState) => lastName)
  const isConnected = (name !== undefined && lastName !== undefined)

  const onClick = (redirect: Page): void => {
    if (!isConnected) {
      setShowPopup(true)
    } else {
      history.push(getPath(redirect, translate))
    }
  }

  const popupStyle: React.CSSProperties = {
    display: showPopup ? 'block' : 'none',
  }

  // TODO(cyrille): Add step 4.
  return <Layout>
    <div style={stepsStyle}>
      {STEPS.map(({title, ...step}, index) => {
        return <React.Fragment key={index}>
          {index ? <ArrowDownIcon style={arrowStyle} color={colors.SILVER_THREE} /> : null}
          <Step index={index + 1} {...step} onClick={onClick}>{translate(title)}</Step>
        </React.Fragment>
      })}
    </div>
    <CreateAccountPopup style={popupStyle} setVisible={setShowPopup} />
  </Layout>
}

export default React.memo(StepsPage)
