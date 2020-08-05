import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {updateProject, useDispatch} from 'store/actions'
import {prepareT} from 'store/i18n'
import {useProjectId} from 'store/selections'
import {Page, getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'

const buttonContainerStyle: React.CSSProperties = {
  display: 'block',
  paddingTop: 20,
}
const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

interface ButtonProps {
  experience: 'new' | '1-3' | '3-5' | '5'
  name: string
  redirect: Page
}
// TODO(cyrille): Make a <select> component with button options.
const BUTTONS: readonly ButtonProps[] = [
  {
    experience: 'new',
    name: prepareT('Je suis novice'),
    redirect: 'DEFINITION_INTEREST',
  },
  {
    experience: '1-3',
    name: prepareT('Entre 1-3 ans'),
    redirect: 'DEFINITION_INTEREST',
  },
  {
    experience: '3-5',
    name: prepareT('Entre 3-5 ans'),
    redirect: 'DEFINITION_INTEREST',
  },
  {
    experience: '5',
    name: prepareT('Plus de 5 ans'),
    redirect: 'DEFINITION_INTEREST',
  },
]

const SelectButtonBase = ({name, redirect, experience}: ButtonProps): React.ReactElement => {
  const dispatch = useDispatch()
  const projectId = useProjectId()
  const [translate] = useTranslation()
  const onClick = useCallback(() => {
    dispatch(updateProject({experience, projectId}))
  }, [dispatch, experience, projectId])
  // TODO(émilie): delete button color prop when button refactoring is reviewed
  // and replace by type="white"
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
const ExperiencePage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Quelle est votre expérience pour ce métier\u00A0?')

  return <Layout header={t('Définition')} title={title}>
    {BUTTONS.map((props: ButtonProps) => <SelectButton {...props} key={props.experience} />)}
  </Layout>
}

export default React.memo(ExperiencePage)
