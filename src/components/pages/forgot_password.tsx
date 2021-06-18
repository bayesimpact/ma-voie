import React, {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'

import {FirebaseAuth} from 'database/firebase'

import Button from 'components/button'
import Input from 'components/input'
import Layout from 'components/layout'

const inputStyle: React.CSSProperties = {
  border: `1px solid ${colors.SILVER_THREE}`,
  borderRadius: 15,
  fontFamily: 'ProximaSoft',
  fontSize: 16,
  height: 24,
  lineHeight: '24px',
  marginTop: 20,
  padding: '18px 25px',
  width: 'calc(100% - 52px)',
}

const buttonStyle: React.CSSProperties = {
  marginTop: 20,
}

const errorStyle: React.CSSProperties = {
  color: colors.RED_ERROR,
  fontSize: 13,
  marginLeft: 25,
}


// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const ForgotPasswordPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)

  const onSubmit = useCallback(() => {
    FirebaseAuth.sendPasswordResetEmail(email).
      then(() => {
        setIsEmailSent(true)
      }).catch((error) => {
        setErrorMessage(error.message)
      })
  }, [email, setErrorMessage, setIsEmailSent])

  return <Layout bigTitle={t('Mot de passe oublié')} menu="site">
    <form onSubmit={onSubmit}>
      <Input
        placeholder={t('Email')} style={inputStyle}
        autoComplete="email" onChange={setEmail} />
      <Button type="secondLevel" onClick={onSubmit} style={buttonStyle} >
        {t('Valider')}
      </Button>
      {isEmailSent ? t('Un email pour réinitialiser votre mot de passe vous a été envoyé.') : null}
      {errorMessage ? <div style={errorStyle}>{errorMessage}</div> : null}
    </form>
  </Layout>
}

export default React.memo(ForgotPasswordPage)
