import React from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {prepareT} from 'store/i18n'
import {getPath} from 'store/url'

import Button from 'components/button'
import CheckboxList from 'components/checkbox_list'
import Layout from 'components/layout'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const buttonStyle: React.CSSProperties = {
  marginTop: 20,
}

const listItems = [
  {index: 0, item: 'Enregistrer les données d\'une commande'},
  {index: 1, item: 'Sélectionner un matériel photographique'},
  {index: 2, item: 'Diriger des modèles'},
  {index: 3, item: 'Réaliser des prises de vues photographiques'},
  {index: 4, item: 'Contrôler la qualité d\'une production'},
  {index: 5, item: 'Traiter numériquement des photographies'},
  {index: 6, item: 'Développer des films des photographies selon un procédé traditionnel'},
  {index: 7, item: 'Sélectionner les photos réalisées, les présenter au client'},
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const SkillsListPage = (): React.ReactElement => {
  const {t} = useTranslation()
  // FIXME(émilie): Sets the job and the skills
  const title = prepareT('Avez-vous les compétences suivantes\u00A0?')
  // FIXME(émilie): Go to prepare the interview
  return <Layout header={t('Compétences')} title={title}>
    <CheckboxList list={listItems} />
    <Link to={getPath('SKILLS_GO', t)} style={linkStyle}>
      <Button bgColor={colors.TEAL_BLUE} style={buttonStyle}>
        {t('Valider')}
      </Button>
    </Link>
  </Layout>
}

export default React.memo(SkillsListPage)
