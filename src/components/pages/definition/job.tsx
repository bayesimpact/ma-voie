import React from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import Layout from 'components/layout'
import {RadiumDiv} from 'components/radium'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const inputStyle: React.CSSProperties = {
  border: `1px solid ${colors.SILVER_THREE}`,
  borderRadius: 15,
  fontFamily: 'ProximaSoft',
  fontSize: 16,
  height: 24,
  lineHeight: 24,
  padding: '18px 25px',
  width: 'calc(100% - 50px)',
}
const ulStyle: React.CSSProperties = {
  border: `1px solid ${colors.SILVER_THREE}`,
  borderRadius: 20,
  listStyleType: 'none',
  padding: 0,
}
const liStyle = {
  ':hover': {
    backgroundColor: colors.GREY_LIGHT,
  },
  'alignItems': 'center',
  'color': colors.DARK_FOREST_GREEN,
  'display': 'flex',
  'height': 60,
  'paddingLeft': 30,
}

interface jobProps {
  name: string
}
// FIXME(émilie): Correctly fill the list of jobs
const jobList = [
  {name: 'Dessinateur'},
  {name: 'Designer graphique'},
  {name: 'Designer produit'},
]
// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const JobPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Pour quel métier souhaitez-vous retrouver un poste\u00A0?')

  // FIXME(émilie): Change link to redirect where it is needed
  return <Layout header={t('Définition')} title={title}>
    <input type="text" style={inputStyle} />
    <ul style={ulStyle}>
      {jobList.map(
        (job: jobProps, index: number): React.ReactElement => {
          const liFinalStyle: React.CSSProperties = {
            borderBottomLeftRadius: index === jobList.length - 1 ? 20 : 0,
            borderBottomRightRadius: index === jobList.length - 1 ? 20 : 0,
            borderTop: index ? `1px solid ${colors.SILVER_THREE}` : 0,
            borderTopLeftRadius: index ? 0 : 20,
            borderTopRightRadius: index ? 0 : 20,
            ...liStyle,
          }
          return <Link key={index} to={getPath('DEFINITION_EXPERIENCE', t)} style={linkStyle}>
            <li>
              <RadiumDiv style={liFinalStyle}>{job.name}</RadiumDiv>
            </li>
          </Link>
        },
      )}
    </ul>
  </Layout>
}

export default React.memo(JobPage)
