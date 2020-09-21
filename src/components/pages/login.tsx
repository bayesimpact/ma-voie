import React, {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import {RootState, authenticateUser, useDispatch} from 'store/actions'
import {getPath} from 'store/url'

import Button from 'components/button'
import ButtonWithIcon from 'components/button_with_icon'
import Input from 'components/input'
import LayoutSignIn from 'components/layout_sign_in'
import PasswordInput from 'components/password_input'

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

const orDivStyle: React.CSSProperties = {
  marginBottom: 10,
  marginTop: 20,
  textAlign: 'center',
}

const buttonThirdPartyStyle: React.CSSProperties = {
  marginTop: 20,
}

const forgottenPasswordDivStyle: React.CSSProperties = {
  marginTop: 20,
  textAlign: 'center',
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const LoginPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const [areErrorFields, setAreErrorFields] = useState<{[K in 'email'|'password']?: boolean}>({})

  const email = useSelector(({firebase: {profile: {email}}}: RootState) => email)
  const [inputEmail, setEmail] = useState(email || '')
  useEffect((): void => {
    email && setEmail(email)
  }, [email])
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = useCallback(async (): Promise<void> => {
    const errorsFields = {
      email: !inputEmail,
      password: !password,
    }
    setAreErrorFields(errorsFields)
    if (!inputEmail || !password) {
      return
    }
    try {
      await dispatch(authenticateUser({email: inputEmail, password, provider: 'password'}))
    } catch (error) {
      // TODO(cyrille): Set this in Redux.
      setErrorMessage(error.message)
    }
  }, [dispatch, inputEmail, password])

  const onSignInWithGoogle = useCallback(async () => {
    try {
      await dispatch(authenticateUser({provider: 'google'}))
    } catch (error) {
      setErrorMessage(error.message)
    }
  }, [dispatch])

  const onSignInWithFacebook = useCallback(async () => {
    try {
      await dispatch(authenticateUser({provider: 'facebook'}))
    } catch (error) {
      setErrorMessage(error.message)
    }
  }, [dispatch])

  const buttonStyle: React.CSSProperties = {
    marginTop: 20,
    opacity: !inputEmail || !password ? 0.75 : 1,
  }

  return <LayoutSignIn bigTitle={t('Connexion')}>
    <form onSubmit={onSubmit}>
      <Input
        placeholder={t('Email')} style={inputStyle}
        autoComplete="email"
        value={inputEmail} onChange={setEmail} />
      {areErrorFields.email ? <div style={errorMessageStyle}>
      </div> : null}
      <PasswordInput style={inputStyle} value={password} onChange={setPassword} />
      {areErrorFields.password ? <div style={errorMessageStyle}>
      </div> : null}
      <div style={forgottenPasswordDivStyle}>
        <Link to={getPath(['FORGOT_PASSWORD'], t)} style={{color: colors.ALMOST_DARK}}>
          {t('Mot de passe oublié\u00A0?')}
        </Link>
      </div>
      <Button type="secondLevel" onClick={onSubmit} style={buttonStyle} >
        {t('Valider')}
      </Button>
      {errorMessage ? <div style={errorValidationStyle}>
        {errorMessage}
      </div> : null}
    </form>
    <div style={orDivStyle}>{t('ou')}</div>
    <ButtonWithIcon type="facebook" style={buttonThirdPartyStyle} onClick={onSignInWithFacebook}>
      {t('Continuer avec Facebook')}
    </ButtonWithIcon>
    <ButtonWithIcon type="google" style={buttonThirdPartyStyle} onClick={onSignInWithGoogle}>
      {t('Continuer avec Google')}
    </ButtonWithIcon>
  </LayoutSignIn>
}

export default React.memo(LoginPage)
