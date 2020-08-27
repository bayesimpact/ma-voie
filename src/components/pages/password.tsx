import React, {useCallback, useEffect, useState} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'

import {FirebaseAuth} from 'database/firebase'
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

const errorValidationStyle: React.CSSProperties = {
  color: colors.RED_ERROR,
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const PasswordPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const history = useHistory()
  const [actionCode, setActionCode] = useState<string|null>('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [confirmMessage, setConfirmMessage] = useState('')

  const invalidLink = useCallback((): void => {
    setErrorMessage(t("Le lien n'est plus valable, veuillez recommencer"))
    setTimeout(() => {
      history.push(getPath(['FORGOT_PASSWORD'], t))
    }, 1000)
  }, [history, t])

  // First, check the validity of the code and retrieve linked email to this code.
  useEffect((): void => {
    const urlParams = new URLSearchParams(window.location.search)
    const _actionCode = urlParams.get('oobCode')
    setActionCode(_actionCode)

    if (!_actionCode) {
      invalidLink()
      return
    }
    FirebaseAuth.verifyPasswordResetCode(_actionCode).
      then(setEmail).
      catch(() => {
        invalidLink()
      })
  }, [invalidLink])

  const onSubmit = useCallback(() => {
    if (password1 !== password2) {
      setErrorMessage(t('Les mots de passe doivent être identiques.'))
      return
    }
    if (!actionCode) {
      invalidLink()
      return
    }
    FirebaseAuth.confirmPasswordReset(actionCode, password1).
      then(() => {
        setConfirmMessage(t('Votre mot de passe a bien été modifié\u00A0!'))
        setTimeout(() => {
          history.push(getPath(['STEPS'], t))
        }, 800)
      }).catch((error) => {
        setErrorMessage(error.message)
      })
  }, [actionCode, history, invalidLink,
    password1, password2, setConfirmMessage, setErrorMessage, t])

  const buttonStyle: React.CSSProperties = {
    marginTop: 20,
    opacity: !password1 || !password2 ? 0.75 : 1,
  }

  return <Layout bigTitle={t('Réinitialisation du mot de passe')} menu="site">
    {email ? <Trans parent="p">
      Réinitialisez votre mot de passe pour <b>{{email}}</b>.
    </Trans> : null}
    <form onSubmit={onSubmit}>
      <Input
        placeholder={t('Nouveau mot de passe')} style={inputStyle} type="password"
        value={password1} onChange={setPassword1} />
      <Input
        placeholder={t('Mot de passe (vérification)')} style={inputStyle}
        type="password" value={password2} onChange={setPassword2} />
      <Button type="secondLevel" onClick={onSubmit} style={buttonStyle} >
        {t('Valider')}
      </Button>
      {errorMessage ? <div style={errorValidationStyle}>
        {errorMessage}
      </div> : null}
      {confirmMessage ? <div>{confirmMessage}</div> : null}
    </form>
  </Layout>
}

export default React.memo(PasswordPage)
