import React, {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'

import {FirebaseAuth, FirebaseErrorProp} from 'database/firebase'
import {RootState, updateUser, useDispatch} from 'store/actions'
import {getPath} from 'store/url'

import Button from 'components/button'
import Input from 'components/input'
import Layout from 'components/layout'

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

const errorValidationStyle: React.CSSProperties = {
  color: colors.RED_ERROR,
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const LoginPage = (): React.ReactElement => {
  const {t} = useTranslation()

  const [areErrorFields, setAreErrorFields] = useState<{[K in 'email'|'password']?: boolean}>({})

  const email = useSelector(({user: {email}}: RootState) => email)
  const [inputEmail, setEmail] = useState(email || '')
  useEffect((): void => {
    email && setEmail(email)
  }, [email])
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()
  const onSubmit = useCallback((): void => {
    const errorsFields = {
      email: !inputEmail,
      password: !password,
    }
    setAreErrorFields(errorsFields)
    if (!inputEmail || !password) {
      return
    }
    FirebaseAuth.signInWithEmailAndPassword(inputEmail, password).
      catch((error: FirebaseErrorProp) => {
        setErrorMessage(error.message)
        return
      })
    // TODO(émilie): Retrieve user data from sign in and set it into local storage
    // ... such as uid, firstName, lastName, to be displayed.
    const update = {
      ...email === inputEmail ? {} : {email: inputEmail},
    }
    dispatch(updateUser(update))
    history.push(getPath(['STEPS'], t))
  }, [dispatch, email, inputEmail, history, password, setErrorMessage, t])

  const buttonStyle: React.CSSProperties = {
    marginTop: 20,
    opacity: !inputEmail || !password ? 0.75 : 1,
  }

  return <Layout bigTitle={t('Connexion')} menu="out">
    <Input
      placeholder={t('Email')} style={inputStyle}
      autoComplete="email"
      value={inputEmail} onChange={setEmail} />
    {areErrorFields.email ? <div style={errorMessageStyle}>
    </div> : null}
    <Input
      placeholder={t('Mot de passe')} style={inputStyle}
      type="password" value={password} onChange={setPassword} />
    {areErrorFields.password ? <div style={errorMessageStyle}>
    </div> : null}
    <Button type="secondLevel" onClick={onSubmit} style={buttonStyle} >
      {t('Valider')}
    </Button>
    {errorMessage ? <div style={errorValidationStyle}>
      {errorMessage}
    </div> : null}
  </Layout>
}

export default React.memo(LoginPage)
