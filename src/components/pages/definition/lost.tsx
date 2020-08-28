import React, {useCallback} from 'react'
import {useTranslation, Trans} from 'react-i18next'
import {Link} from 'react-router-dom'

import {updateProject, useDispatch} from 'store/actions'
import {useProjectId} from 'store/selections'
import {getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const contentStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 25,
  lineHeight: 1.15,
  margin: '0 10px 20px',
  textAlign: 'center',
}
const buttonContainerStyle: React.CSSProperties = {
  paddingTop: 20,
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const LostPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const projectId = useProjectId()
  const dispatch = useDispatch()

  const onClick = useCallback((): void => {
    dispatch(updateProject({hasNoClearJob: true, projectId}))
  }, [dispatch, projectId])

  return <Layout header={t('Définition')} bigTitle={t('Ne vous inquiétez pas, on est là\u00A0!')}>
    <Trans parent="p" style={contentStyle}>
      Même si vous êtes perdu·e pour le moment,
      nous allons vous aider à trouver le métier parfait pour vous.
    </Trans>
    <Trans parent="p" style={contentStyle}>
      Première étape, définir ensemble un projet qui vous plaît.
    </Trans>
    <Trans parent="p" style={contentStyle}>
      On y va&nbsp;?
    </Trans>
    <div style={buttonContainerStyle}>
      <Link to={getPath(['DEFINITION', 'PARTNERS_INTERNAL'], t)}
        style={linkStyle} onClick={onClick}>
        <Button type="secondLevel">{t('C\'est parti\u00A0!')}</Button>
      </Link>
    </div>
  </Layout>
}

export default React.memo(LostPage)
