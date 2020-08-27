import React, {useCallback, useEffect, useState} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'

import {FirebaseAuth, FirebaseErrorProps} from 'database/firebase'
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
  marginTop: 20,
  padding: '18px 25px',
  width: 'calc(100% - 52px)',
}
const errorMessageStyle: React.CSSProperties = {
  color: colors.RED_ERROR,
  fontSize: 13,
  marginLeft: 25,
}
const layoutStyle: React.CSSProperties = {
  marginBottom: 20,
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const AccountPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const history = useHistory()

  const uid = useSelector(({user: {uid}}: RootState) => uid)
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
  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false)
  const [areErrorFields, setAreErrorFields] =
    useState<{[K in 'email'|'lastName'|'name'|'password']?: boolean}>({})
  const [errorMessage, setErrorMessage] = useState('')

  const [updated, setUpdated] = useState(false)
  useEffect((): () => void => {
    if (!updated) {
      return (): void => void 0
    }
    const timeout = setTimeout(() => setUpdated(false), 2000)
    return (): void => {
      clearTimeout(timeout)
      history.push(getPath(['STEPS'], t))
    }
  })

  const dispatch = useDispatch()

  const onSave = useCallback((): void => {
    const emailReg = /^([\w+.-])+@([\w.-])+\.([A-Za-z]{2,4})$/
    const errorsFields = {
      email: !inputEmail || !emailReg.test(inputEmail),
      lastName: !inputLastName,
      name: !inputName,
      password: !password && !uid,
    }
    setAreErrorFields(errorsFields)
    if (!inputName || !inputLastName ||
      !inputEmail || !emailReg.test(inputEmail) || (!password && !uid)) {
      setIsErrorDisplayed(true)
      return
    }
    setIsErrorDisplayed(false)
    const update = {
      ...name === inputName ? {} : {name: inputName},
      ...lastName === inputLastName ? {} : {lastName: inputLastName},
      ...email === inputEmail || uid ? {} : {email: inputEmail},
    }
    if (Object.keys(update).length) {
      dispatch(updateUser(update))
      // TODO(émilie): Move to actions.ts
      if (!uid) {
        FirebaseAuth.createUserWithEmailAndPassword(inputEmail, password).
          catch((error: FirebaseErrorProps) => {
            setErrorMessage(error.message)
            return
          }).
          then(() => setUpdated(true))
      } else {
        // TODO(émilie): Update the user in firebase
        setUpdated(true)
      }
    }
  }, [dispatch,
    email, name, inputEmail, inputName, lastName, inputLastName,
    password, setErrorMessage, uid])
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

  const buttonStyle: React.CSSProperties = {
    marginTop: 20,
    opacity: !inputName || !inputLastName || !inputEmail || (!password && !uid) ? 0.75 : 1,
  }

  const errorValidationStyle: React.CSSProperties = {
    color: colors.RED_ERROR,
  }

  const inputNameStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: areErrorFields.name ? colors.RED_ERROR : colors.SILVER_THREE,
  }
  const inputLastNameStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: areErrorFields.lastName ? colors.RED_ERROR : colors.SILVER_THREE,
  }
  const inputEmailStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: areErrorFields.email ? colors.RED_ERROR : colors.SILVER_THREE,
  }
  const inputPasswordStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: areErrorFields.password ? colors.RED_ERROR : colors.SILVER_THREE,
  }

  return <Layout bigTitle={t('Inscription')} style={layoutStyle}>
    <Input
      placeholder={t('Prénom')} style={inputNameStyle}
      autoComplete="given-name"
      value={inputName} onChange={setName} />
    {areErrorFields.name ? <Trans style={errorMessageStyle}>
      <sup>*</sup>Champ obligatoire
    </Trans> : null}
    <Input
      placeholder={t('Nom')} style={inputLastNameStyle}
      autoComplete="family-name"
      value={inputLastName} onChange={setLastName} />
    {areErrorFields.lastName ? <Trans style={errorMessageStyle}>
      <sup>*</sup>Champ obligatoire
    </Trans> : null}
    <Input
      placeholder={t('Email')} style={inputEmailStyle}
      autoComplete="email" disabled={uid ? true : false}
      value={inputEmail} onChange={setEmail} />
    {areErrorFields.email ? <Trans style={errorMessageStyle}>
      <sup>*</sup>Champ obligatoire
    </Trans> : null}
    {uid ? null : <Input
      placeholder={t('Mot de passe')} style={inputPasswordStyle}
      type="password" autoComplete="new-password"
      value={password} onChange={setPassword} />}
    {!uid && areErrorFields.password ?
      <Trans style={errorMessageStyle}>
        <sup>*</sup>Champ obligatoire, vérifiez votre email
      </Trans>
      : null}
    <Button type="secondLevel" onClick={onSave} style={buttonStyle} >
      {t('Valider')}
    </Button>
    {updated ? t('Vos identifiants ont été mis à jour.') : null}
    {isErrorDisplayed ? <div style={errorValidationStyle}>
      {t('Veuillez saisir les champs obligatoires pour continuer')}
    </div> : null}
    {errorMessage ? <div style={errorValidationStyle}>
      {errorMessage}
    </div> : null}
  </Layout>
}

export default React.memo(AccountPage)
