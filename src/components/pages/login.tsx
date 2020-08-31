import React, {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'

import {FirebaseAuth, FirebaseErrorProps,
  facebookAuthProvider, googleAuthProvider} from 'database/firebase'
import {RootState, updateUser, useDispatch} from 'store/actions'
import {getPath} from 'store/url'

import Button from 'components/button'
import ButtonWithIcon from 'components/button_with_icon'
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
    // TODO(émilie): Change for react-redux-firebase.
    FirebaseAuth.signInWithEmailAndPassword(inputEmail, password).
      catch((error: FirebaseErrorProps) => {
        setErrorMessage(error.message)
        return
      }).
      then(() => {
        // TODO(émilie): Retrieve user data from sign in and set it into local storage
        // ... such as uid, firstName, lastName, to be displayed.
        const update = {
          ...email === inputEmail ? {} : {email: inputEmail},
        }
        dispatch(updateUser(update))
        history.push(getPath(['STEPS'], t))
      })
  }, [dispatch, email, inputEmail, history, password, setErrorMessage, t])

  // TODO(émilie): Move to actions.ts.
  // TODO(émilie): Change for react-redux-firebase.
  const onSignInWithGoogle = useCallback((): void => {
    FirebaseAuth.signInWithPopup(googleAuthProvider).
      then((result) => {
        const firebaseUser = result.user
        if (!firebaseUser) {
          // This should never happen, see
          // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithpopup
          return
        }
        // TODO(émilie): Retrieve user data from firestore.
        const update = {
          ...firebaseUser.email ? {email: firebaseUser.email} : {},
          uid: firebaseUser.uid,
        }
        dispatch(updateUser(update))
        history.push(getPath(['STEPS'], t))
      }).
      catch((error: FirebaseErrorProps) => {
        setErrorMessage(error.message)
        return
      })
  }, [dispatch, history, t])

  // TODO(émilie): Move to actions.ts.
  // TODO(émilie): DRY with Google signin.
  // TODO(émilie): Change for react-redux-firebase.
  const onSignInWithFacebook = useCallback((): void => {
    FirebaseAuth.signInWithPopup(facebookAuthProvider).
      then((result) => {
        const firebaseUser = result.user
        if (!firebaseUser) {
          // This should never happen, see
          // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithpopup
          return
        }
        // TODO(émilie): Retrieve user data from firestore.
        const update = {
          ...firebaseUser.email ? {email: firebaseUser.email} : {},
          uid: firebaseUser.uid,
        }
        dispatch(updateUser(update))
        history.push(getPath(['STEPS'], t))
      }).
      catch((error) => {
        setErrorMessage(error.message)
        return
      })
  }, [dispatch, history, t])

  const buttonStyle: React.CSSProperties = {
    marginTop: 20,
    opacity: !inputEmail || !password ? 0.75 : 1,
  }

  return <Layout bigTitle={t('Connexion')} menu="site">
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
  </Layout>
}

export default React.memo(LoginPage)
