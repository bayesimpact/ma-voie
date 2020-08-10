import React from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import Button from 'components/button'
import CheckboxList from 'components/checkbox_list'
import Layout from 'components/layout'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const buttonContainerStyle: React.CSSProperties = {
  marginBottom: 20,
  paddingTop: 20,
}

const listItems = [
  {name: 'Enregistrer les données d\'une commande'},
  {name: 'Sélectionner un matériel photographique'},
  {name: 'Diriger des modèles'},
  {name: 'Réaliser des prises de vues photographiques'},
  {name: 'Contrôler la qualité d\'une production'},
  {name: 'Traiter numériquement des photographies'},
  {name: 'Développer des films des photographies selon un procédé traditionnel'},
  {name: 'Sélectionner les photos réalisées, les présenter au client'},
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const SkillsListPage = (): React.ReactElement => {
  const {t} = useTranslation()
  // FIXME(émilie): Sets the job and the skills
  const title = t('Avez-vous les compétences suivantes\u00A0?')
  // FIXME(émilie): Go to prepare the interview
  return <Layout header={t('Compétences')} title={title}>
    <CheckboxList list={listItems} />
    <div style={buttonContainerStyle}>
      <Link to={getPath(['SKILLS', 'GO'], t)} style={linkStyle}>
        <Button type="secondLevel">
          {t('Valider')}
        </Button>
      </Link>
    </div>
  </Layout>
}

export default React.memo(SkillsListPage)
