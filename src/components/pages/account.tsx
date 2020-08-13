import React, {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'

import {useFastForward} from 'hooks/fast_forward'
import {RootState, updateUser, useDispatch} from 'store/actions'
import {getPath} from 'store/url'

import Button from 'components/button'
import Input from 'components/input'
import Layout from 'components/layout'

const getUniqueExampleEmail = (): string => `test-${new Date().getTime()}@example.com`


const inputStyle: React.CSSProperties = {
  border: `1px solid ${colors.SILVER_THREE}`,
  borderRadius: 15,
  fontFamily: 'ProximaSoft',
  fontSize: 16,
  height: 24,
  lineHeight: 24,
  marginBottom: 20,
  padding: '18px 25px',
  width: 'calc(100% - 52px)',
}
// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const AccountPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const history = useHistory()

  const name = useSelector(({user: {name}}: RootState) => name)
  const [inputName, setName] = useState(name || '')
  useEffect((): void => {
    name && setName(name)
  }, [name])

  const lastName = useSelector(({user: {lastName}}: RootState) => lastName)
  const [inputLastName, setLastName] = useState(lastName || '')
  useEffect((): void => {
    lastName && setLastName(lastName)
  }, [lastName])

  const email = useSelector(({user: {email}}: RootState) => email)
  const [inputEmail, setEmail] = useState(email || '')
  useEffect((): void => {
    email && setEmail(email)
  }, [email])

  const [password, setPassword] = useState('')

  const [updated, setUpdated] = useState(false)
  useEffect((): () => void => {
    if (!updated) {
      return (): void => void 0
    }
    const timeout = setTimeout(() => setUpdated(false), 2000)
    return (): void => {
      clearTimeout(timeout)
      history.push(getPath(['DEFINITION', 'WHERE'], t))
    }
  })

  const dispatch = useDispatch()
  const onSave = useCallback((): void => {
    const update = {
      ...name === inputName ? {} : {name: inputName},
      ...lastName === inputLastName ? {} : {lastName: inputLastName},
      ...email === inputEmail ? {} : {email: inputEmail},
    }
    if (Object.keys(update).length) {
      dispatch(updateUser(update))
      setUpdated(true)
    }
  }, [dispatch, email, name, inputEmail, inputName, lastName, inputLastName])
  useFastForward(() => {
    if (inputName && inputLastName && inputEmail && password) {
      onSave()
      return
    }
    if (!inputName) {
      setName('Angèle')
    }
    if (!inputLastName) {
      setLastName('Dupont')
    }
    if (!inputEmail) {
      setEmail(getUniqueExampleEmail())
    }
    if (!password) {
      setPassword('password')
    }
  })

  return <Layout bigTitle={t('Inscription')}>
    <Input
      placeholder={t('Prénom')} style={inputStyle}
      autoComplete="given-name"
      value={inputName} onChange={setName} />
    <Input
      placeholder={t('Nom')} style={inputStyle}
      autoComplete="family-name"
      value={inputLastName} onChange={setLastName} />
    <Input
      placeholder={t('Email')} style={inputStyle}
      autoComplete="email"
      value={inputEmail} onChange={setEmail} />
    <Input
      placeholder={t('Mot de passe')} style={inputStyle}
      type="password" autoComplete="new-password"
      value={password} onChange={setPassword} />
    <Button type="secondLevel" onClick={onSave} >
      {t('Valider')}
    </Button>
    {updated ? t('Vos identifiants ont été mis à jour.') : null}
  </Layout>
}

export default React.memo(AccountPage)
