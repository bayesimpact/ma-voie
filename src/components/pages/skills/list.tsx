import React, {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'

import {updateProject, useDispatch} from 'store/actions'
import {useProject, useProjectId} from 'store/selections'
import {getPath} from 'store/url'

import Button from 'components/button'
import CheckboxList from 'components/checkbox_list'
import Layout from 'components/layout'

const buttonContainerStyle: React.CSSProperties = {
  marginBottom: 20,
  paddingTop: 20,
}

const priorityStyle: React.CSSProperties = {
  fontWeight: 'bold',
}

interface SkillType {
  codeOgr: string
  isPriority?: boolean
  name: string
}

// TODO(émilie): Move into another file
// FIXME(émilie): Select by rome ID first
const skillsByOgr: SkillType[] = [
  {
    codeOgr: '101343',
    isPriority: true,
    name: 'Principes de la relation client',
  },
  {
    codeOgr: '123058',
    isPriority: true,
    name: 'Techniques de séchage',
  },
  {
    codeOgr: '101908',
    isPriority: true,
    name: 'Manipulation d\'outil tranchant (ciseaux ...)',
  },
  {
    codeOgr: '101909',
    isPriority: true,
    name: 'Diagnostic capillaire',
  },
  {
    codeOgr: '101910',
    isPriority: true,
    name: 'Techniques de coupes de cheveux',
  },
  {
    codeOgr: '101912',
    isPriority: true,
    name: 'Coiffure enfant',
  },
  {
    codeOgr: '101913',
    isPriority: true,
    name: 'Coiffure femme',
  },
  {
    codeOgr: '101914',
    isPriority: true,
    name: 'Coiffure homme',
  },
  {
    codeOgr: '101915',
    isPriority: true,
    name: 'Techniques de décoloration, de coloration de cheveux...',
  },
  {
    codeOgr: '101923',
    isPriority: true,
    name: 'Techniques de pose de perruques',
  },
  {
    codeOgr: '119893',
    isPriority: true,
    name: 'Techniques de raccord, de rajouts, d\'extensions',
  },
  {
    codeOgr: '118975',
    name: 'Outils bureautiques',
  },
  {
    codeOgr: '120889',
    name: 'Gestion administrative',
  },
  {
    codeOgr: '120888',
    name: 'Gestion comptable',
  },
  {
    codeOgr: '100090',
    name: 'Techniques pédagogiques',
  },
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const SkillsListPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Avez-vous les compétences suivantes\u00A0?')

  const dispatch = useDispatch()
  const projectId = useProjectId()
  const project = useProject()
  const history = useHistory()

  const [valuesSelected, setValuesSelected] = useState<string[]>(project.skills || [])

  const handleClick = useCallback((): void => {
    dispatch(updateProject({projectId, skills: valuesSelected}))
    // TODO(émilie): validate when all the priority items are checked
    if (valuesSelected.length === skillsByOgr.length) {
      history.push(getPath(['SKILLS', 'GO'], t))
    } else {
      history.push(getPath(['SKILLS', 'TRAINING'], t))
    }
  }, [dispatch, history, projectId, t, valuesSelected])

  const checkboxListData = skillsByOgr.map(({codeOgr, isPriority = false, name}) =>
    isPriority
      ? {label: <span style={priorityStyle}>{name}</span>, value: codeOgr}
      : {label: name, value: codeOgr},
  )

  return <Layout header={t('Compétences')} title={title}>
    <CheckboxList list={checkboxListData}
      valuesSelected={valuesSelected} onChange={setValuesSelected} />
    <div style={buttonContainerStyle}>
      <Button type="secondLevel" onClick={handleClick}>
        {t('Valider')}
      </Button>
    </div>
  </Layout>
}

export default React.memo(SkillsListPage)
