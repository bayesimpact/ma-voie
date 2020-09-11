import React, {useCallback} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'

import {getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'
import definitionIcon from 'images/definition-ico.svg'

const buttonStyle: React.CSSProperties = {
  marginTop: 20,
}

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: 'calc( 100vh - 60px - 90px)',
  justifyContent: 'space-between',
  maxWidth: 315,
  paddingTop: 40,
  textAlign: 'center',
  width: 315,
}

const iconStyle: React.CSSProperties = {
  backgroundColor: colors.LIGHT_TAN,
  borderRadius: 66,
  height: 132,
  width: 132,
}

const titleStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 15,
  marginTop: 20,
}
// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const CongratulationsPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const history = useHistory()
  const onSubmit = useCallback(() => {
    history.push(getPath(['STEPS'], t))

  }, [history, t])

  return <Layout style={layoutStyle}>
    <div>
      <img style={iconStyle} src={definitionIcon} alt="" />
      <Trans parent="h1" style={titleStyle}>
        Félicitations&nbsp;!
      </Trans>
      <Trans parent="p">
        Une personne de Ma Voie va vous contacter très prochainement.<br /><br />
        Pensez à vérifier vos emails&nbsp;!
      </Trans>
    </div>
    <Button type="secondLevel" onClick={onSubmit} style={buttonStyle} >
      {t("C'est noté")}
    </Button>
  </Layout>
}

export default React.memo(CongratulationsPage)
