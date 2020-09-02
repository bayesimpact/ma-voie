import {UserCredential} from '@firebase/auth-types'
import React, {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useFirebase, useFirestore} from 'react-redux-firebase'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'

import {RootState, updateUser, useDispatch} from 'store/actions'
import {getPath} from 'store/url'

import Button from 'components/button'
import ButtonWithIcon from 'components/button_with_icon'
import Input from 'components/input'
import LayoutSignIn from 'components/layout_sign_in'

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

type AuthResult = {user: UserCredential}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const LoginPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const firebase = useFirebase()
  const firestore = useFirestore()

  const [areErrorFields, setAreErrorFields] = useState<{[K in 'email'|'password']?: boolean}>({})

  const email = useSelector(({firebase: {profile: {email}}}: RootState) => email)
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
    firebase.login({email: inputEmail, password}).
      catch((error) => {
        setErrorMessage(error.message)
        return
      }).
      then((result) => {
        if (!result) {
          return
        }
        // TODO(émilie): result is of the form {user: UserCredential} but has type UserCredential
        // in Typescript. Correct this when the bug is solved (as in Google/Facebook login).
        // See https://github.com/prescottprue/react-redux-firebase/issues/996
        const {user: {user: firebaseUser} = {}} = result as unknown as AuthResult
        if (!firebaseUser) {
          // This should never happen, see
          // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithpopup
          return
        }
        firestore.get({collection: 'projects', where: ['uid', '==', firebaseUser.uid]})
        history.push(getPath(['STEPS'], t))
      })
  }, [dispatch, email, firebase, inputEmail, history, password, setErrorMessage, t])

  // TODO(émilie): Move to actions.ts.
  const onSignInWithGoogle = useCallback((): void => {
    firebase.login({provider: 'google', type: 'popup'}).
      then((result) => {
        const firebaseUser = result.user
        if (!firebaseUser) {
          // This should never happen, see
          // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithpopup
          return
        }
        firestore.get({collection: 'projects', where: ['uid', '==', firebaseUser.uid]})
        history.push(getPath(['STEPS'], t))
      }).
      catch((error) => {
        setErrorMessage(error.message)
        return
      })
  }, [dispatch, firebase, history, t])

  // TODO(émilie): Move to actions.ts.
  // TODO(émilie): DRY with Google signin.
  const onSignInWithFacebook = useCallback((): void => {
    firebase.login({provider: 'facebook', type: 'popup'}).
      then((result) => {
        const firebaseUser = result.user
        if (!firebaseUser) {
          // This should never happen, see
          // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithpopup
          return
        }
        firestore.get({collection: 'projects', where: ['uid', '==', firebaseUser.uid]})
        history.push(getPath(['STEPS'], t))
      }).
      catch((error) => {
        setErrorMessage(error.message)
        return
      })
  }, [dispatch, firebase, history, t])

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
      <Input
        placeholder={t('Mot de passe')} style={inputStyle}
        type="password" value={password} onChange={setPassword} />
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
