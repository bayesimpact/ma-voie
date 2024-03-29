import React, {useCallback, useMemo, useState} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'

import {useDispatch, updateProject} from 'store/actions'
import {useProject, useSkillsList} from 'store/selections'
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

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const SkillsListPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Maîtrisez-vous les compétences suivantes\u00A0?')

  const dispatch = useDispatch()
  const project = useProject()
  const history = useHistory()
  const skillsList = useSkillsList()

  const [valuesSelected, setValuesSelected] = useState<readonly string[]>(project.skills || [])

  const handleClick = useCallback((): void => {
    dispatch(updateProject({skills: valuesSelected}))
    const isMissingPrioritySkill = skillsList.some(({codeOgr, isPriority}) =>
      isPriority && !valuesSelected.includes(codeOgr))
    if (isMissingPrioritySkill) {
      history.push(getPath(['SKILLS', 'TRAINING'], t))
      return
    }
    history.push(getPath(['SKILLS', 'GO'], t))
  }, [dispatch, history, skillsList, t, valuesSelected])

  const checkboxListData = useMemo(() => skillsList.map(({codeOgr, isPriority, name}) =>
    isPriority
      ? {label: <span style={priorityStyle}>{name}</span>, value: codeOgr}
      : {label: name, value: codeOgr},
  ), [skillsList])

  return <Layout header={t('Compétences')} title={title}>
    <Trans parent="p">
      Suivant votre réponse, on vous emmène à l’étape "formation"
      {' '}ou "préparation d’entretien"&nbsp;!
    </Trans>
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
