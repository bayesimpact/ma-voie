import React, {useCallback, useEffect, useMemo, useState} from 'react'
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

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const SkillsListPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Avez-vous les compétences suivantes\u00A0?')

  const dispatch = useDispatch()
  const projectId = useProjectId()
  const project = useProject()
  const history = useHistory()
  const {job: {jobGroup: {romeId = ''} = {}} = {}} = project
  const [skillsList, setSkillsList] = useState<readonly SkillType[]>([])
  useEffect((): void => {
    if (!romeId) {
      return
    }
    // TODO(cyrille): Rather fetch from static values in production assets.
    import(`skills/skills_${romeId}.json`).then(({default: list}) => setSkillsList(list))
  }, [romeId])

  const [valuesSelected, setValuesSelected] = useState<readonly string[]>(project.skills || [])

  const handleClick = useCallback((): void => {
    dispatch(updateProject({projectId, skills: valuesSelected}))
    // TODO(émilie): validate when all the priority items are checked
    if (valuesSelected.length === skillsList.length) {
      history.push(getPath(['SKILLS', 'GO'], t))
    } else {
      history.push(getPath(['SKILLS', 'TRAINING'], t))
    }
  }, [dispatch, history, projectId, skillsList.length, t, valuesSelected])

  const checkboxListData = useMemo(() => skillsList.map(({codeOgr, isPriority, name}) =>
    isPriority
      ? {label: <span style={priorityStyle}>{name}</span>, value: codeOgr}
      : {label: name, value: codeOgr},
  ), [skillsList])

  return <Layout header={t('Compétences')} title={title}>
    <CheckboxList
      list={checkboxListData} valuesSelected={valuesSelected} onChange={setValuesSelected} />
    <div style={buttonContainerStyle}>
      <Button type="secondLevel" onClick={handleClick}>
        {t('Valider')}
      </Button>
    </div>
  </Layout>
}

export default React.memo(SkillsListPage)
