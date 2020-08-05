import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {updateProject, useDispatch} from 'store/actions'
import {prepareT} from 'store/i18n'
import {useProjectId} from 'store/selections'
import {Page, getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const buttonContainerStyle: React.CSSProperties = {
  fontSize: 16,
  paddingBottom: 20,
}

interface ButtonProps {
  hasDefinedProject: boolean
  name: string
  redirect: Page
}
// TODO(cyrille): Make a <select> component with button options.
const BUTTONS: readonly ButtonProps[] = [
  {
    hasDefinedProject: true,
    name: prepareT('Je sais ce que je veux faire'),
    redirect: 'DEFINITION_WHAT',
  },
  {
    hasDefinedProject: false,
    name: prepareT('Je ne sais pas / Je suis perdu·e'),
    redirect: 'DEFINITION_LOST',
  },
]

const SelectButtonBase = ({name, redirect, hasDefinedProject}: ButtonProps): React.ReactElement => {
  const dispatch = useDispatch()
  const projectId = useProjectId()
  const [translate] = useTranslation()
  const onClick = useCallback(() => {
    dispatch(updateProject({hasDefinedProject, projectId}))
  }, [dispatch, hasDefinedProject, projectId])
  return <div style={buttonContainerStyle}>
    <Link to={getPath(redirect, translate)} style={linkStyle}>
      <Button color={colors.DARK_FOREST_GREEN} onClick={onClick}>
        {translate(name)}
      </Button>
    </Link>
  </div>
}
const SelectButton = React.memo(SelectButtonBase)

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const WherePage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Où en êtes-vous de votre projet professionnel\u00A0?')

  // FIXME(émilie): Delete links and change them by the good handler
  return <Layout header={t('Définition')} title={title}>
    {BUTTONS.map((props: ButtonProps) =>
      <SelectButton {...props} key={props.redirect} />)}
  </Layout>
}

export default React.memo(WherePage)
