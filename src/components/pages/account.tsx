import React, {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useFirebase, useFirestore} from 'react-redux-firebase'
import {useHistory} from 'react-router'

import {FirebaseAuth} from 'database/firebase'
import {useFastForward} from 'hooks/fast_forward'
import {RootState, updateUser, useDispatch} from 'store/actions'
import {getPath} from 'store/url'
import {validateEmail} from 'store/validations'

import Button from 'components/button'
import Input from 'components/input'
import LayoutSignIn from 'components/layout_sign_in'

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
  const firebase = useFirebase()
  const firestore = useFirestore()

  const uid = useSelector(({firebase: {auth: {uid}}}: RootState) => uid)
  const {email, lastName, name} = useSelector(({firebase: {profile}}: RootState) => profile)
  const [inputName, setName] = useState(name || '')
  useEffect((): void => {
    name && setName(name)
  }, [name])

  const [inputLastName, setLastName] = useState(lastName || '')
  useEffect((): void => {
    lastName && setLastName(lastName)
  }, [lastName])

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
    const isEmailValid = validateEmail(inputEmail)
    const errorsFields = {
      email: !inputEmail || !isEmailValid,
      lastName: !inputLastName,
      name: !inputName,
      password: !password && !uid,
    }
    setAreErrorFields(errorsFields)
    if (Object.values(errorsFields).some(field => field)) {
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
        firebase.createUser({email: inputEmail, password}).
          then(() => {
            const uid = FirebaseAuth?.currentUser?.uid
            dispatch(updateUser({uid}))
            firestore.update({collection: 'users', doc: uid}, update)
            setUpdated(true)
          }).
          catch((error) => {
            setErrorMessage(error.message)
            return
          })
      } else {
        firestore.update({collection: 'users', doc: uid}, update)
        setUpdated(true)
      }
    }
  }, [dispatch, email, firebase, firestore, name, inputEmail,
    inputName, lastName, inputLastName, password, setErrorMessage, uid])
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

  // TODO(pascal): Investigate how much the layoutStyle is useful.
  return <LayoutSignIn bigTitle={t('Inscription')} style={layoutStyle}>
    <Input
      placeholder={t('Prénom')} style={inputNameStyle}
      autoComplete="given-name"
      value={inputName} onChange={setName} />
    {areErrorFields.name ?
      <div style={errorMessageStyle}><sup>*</sup>{t('Champ obligatoire')}</div> :
      null}
    <Input
      placeholder={t('Nom')} style={inputLastNameStyle}
      autoComplete="family-name"
      value={inputLastName} onChange={setLastName} />
    {areErrorFields.lastName ?
      <div style={errorMessageStyle}><sup>*</sup>{t('Champ obligatoire')}</div> :
      null}
    <Input
      placeholder={t('Email')} style={inputEmailStyle}
      autoComplete="email" disabled={uid ? true : false}
      value={inputEmail} onChange={setEmail} />
    {areErrorFields.email ?
      <div style={errorMessageStyle}><sup>*</sup>{t('Champ obligatoire')}</div> :
      null}
    {uid ? null : <Input
      placeholder={t('Mot de passe')} style={inputPasswordStyle}
      type="password" autoComplete="new-password"
      value={password} onChange={setPassword} />}
    {!uid && areErrorFields.password ?
      <div style={errorMessageStyle}>
        <sup>*</sup>{t('Champ obligatoire, vérifiez votre email')}
      </div> :
      null}
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
  </LayoutSignIn>
}

export default React.memo(AccountPage)
