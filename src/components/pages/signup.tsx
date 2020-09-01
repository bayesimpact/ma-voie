import React, {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useFirebase} from 'react-redux-firebase'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'

import {FirebaseAuth} from 'database/firebase'
import {updateUser, useDispatch} from 'store/actions'
import {getPath} from 'store/url'

import ButtonWithIcon from 'components/button_with_icon'
import LayoutSignIn from 'components/layout_sign_in'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

const buttonStyle: React.CSSProperties = {
  marginBottom: 15,
}
const divStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 16,
  marginTop: 20,
  textAlign: 'center',
}
const linkConnectStyle: React.CSSProperties = {
  color: colors.TURQUOISE_BLUE,
}

const errorValidationStyle: React.CSSProperties = {
  color: colors.RED_ERROR,
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
// TODO(émilie): Link the buttons.
const SignupPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const history = useHistory()
  const firebase = useFirebase()
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch()

  FirebaseAuth.onAuthStateChanged((user: firebase.User|null) => {
    if (user) {
      // TODO(émilie): Manager the case where there is already a uid.
      dispatch(updateUser({uid: user.uid}))
    }
  })

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
        const update = {
          ...firebaseUser.email ? {email: firebaseUser.email} : {},
          // TODO (émilie): Split displayName into first and last name.
          ...firebaseUser.displayName ? {name: firebaseUser.displayName} : {},
          uid: firebaseUser.uid,
        }
        dispatch(updateUser(update))
        history.push(getPath(['ACCOUNT'], t))
      }).
      catch((error) => {
        setErrorMessage(error.message)
        return
      })
  }, [dispatch, firebase, history, t])

  // TODO(émilie): Move to actions.ts.
  // TODO(émilie): DRY with Google signup.
  const onSignInWithFacebook = useCallback((): void => {
    firebase.login({provider: 'facebook', type: 'popup'}).
      then((result) => {
        const firebaseUser = result.user
        if (!firebaseUser) {
          // This should never happen, see
          // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithpopup
          return
        }
        const update = {
          ...firebaseUser.email ? {email: firebaseUser.email} : {},
          // TODO (émilie): Split displayName into first and last name.
          ...firebaseUser.displayName ? {name: firebaseUser.displayName} : {},
          uid: firebaseUser.uid,
        }
        dispatch(updateUser(update))
        history.push(getPath(['ACCOUNT'], t))
      }).
      catch((error) => {
        setErrorMessage(error.message)
        return
      })
  }, [dispatch, firebase, history, t])

  return <LayoutSignIn bigTitle={t('Inscription')}>
    <Link to={getPath(['ACCOUNT'], t)} style={linkStyle}>
      <ButtonWithIcon type="email" style={buttonStyle}>
        {t('S\'inscrire avec un email')}
      </ButtonWithIcon>
    </Link>
    <ButtonWithIcon type="facebook" style={buttonStyle} onClick={onSignInWithFacebook}>
      {t('Continuer avec Facebook')}
    </ButtonWithIcon>
    <ButtonWithIcon type="google" style={buttonStyle} onClick={onSignInWithGoogle}>
      {t('Continuer avec Google')}
    </ButtonWithIcon>
    {errorMessage ? <div style={errorValidationStyle}>
      {errorMessage}
    </div> : null}
    <div style={divStyle}>
      {t('Déjà un compte\u00A0?')}&nbsp;
      <Link to={getPath(['LOGIN'], t)} style={linkConnectStyle}>{t('Se connecter')}</Link>
    </div>
  </LayoutSignIn>
}

export default React.memo(SignupPage)
