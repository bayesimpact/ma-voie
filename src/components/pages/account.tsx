import React, {useCallback, useEffect, useState} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useFirebase, useFirestore} from 'react-redux-firebase'
import {useHistory} from 'react-router'

import {useFastForward} from 'hooks/fast_forward'
import {RootState} from 'store/actions'
import {useUserId} from 'store/selections'
import {getPath} from 'store/url'
import {validateEmail} from 'store/validations'

import Button from 'components/button'
import Input from 'components/input'
import LayoutSignIn from 'components/layout_sign_in'
import PasswordInput from 'components/password_input'

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
const checkboxLabelStyle: React.CSSProperties = {
  alignItems: 'center',
  cursor: 'pointer',
  display: 'inline-flex',
  marginTop: 10,
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const AccountPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const history = useHistory()
  const firebase = useFirebase()
  const firestore = useFirestore()

  const userId = useUserId()
  const {email, lastName, name, phone, jobSeeker, retraining} = useSelector(
    ({firebase: {profile}}: RootState) => profile)
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

  const [inputPhone, setPhone] = useState(phone || '')
  useEffect((): void => {
    phone && setPhone(phone)
  }, [phone])

  const [inputJobSeeker, setJobSeeker] = useState(jobSeeker || false)
  const handleJobSeeker = useCallback((e): void => {
    setJobSeeker(e.target.checked)
  }, [setJobSeeker])

  const [inputRetraining, setRetraining] = useState(retraining || false)
  const handleRetraining = useCallback((e): void => {
    setRetraining(e.target.checked)
  }, [setRetraining])

  const [password, setPassword] = useState('')
  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false)
  const [areErrorFields, setAreErrorFields] =
    useState<{[K in 'email'|'lastName'|'name'|'phone'|'password']?: boolean}>({})
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

  const onSave = useCallback((): void => {
    const isEmailValid = validateEmail(inputEmail)
    const errorsFields = {
      email: !inputEmail || !isEmailValid,
      lastName: !inputLastName,
      name: !inputName,
      password: !password && !userId,
      phone: !inputPhone || inputPhone.length < 8,
    }
    setAreErrorFields(errorsFields)
    if (Object.values(errorsFields).some(field => field)) {
      return
    }
    setIsErrorDisplayed(false)
    const update = {
      ...name === inputName ? {} : {name: inputName},
      ...lastName === inputLastName ? {} : {lastName: inputLastName},
      ...email === inputEmail || userId ? {} : {email: inputEmail},
      ...phone === inputPhone ? {} : {phone: inputPhone},
      ...inputJobSeeker ? {jobSeeker: true} : {jobSeeker: false},
      ...inputRetraining ? {retraining: true} : {retraining: false},
    }
    if (Object.keys(update).length) {
      // TODO(émilie): Move to actions.ts
      if (!userId) {
        firebase.createUser({email: inputEmail, password}, update).
          then(
            () => setUpdated(true),
            (error) => {
              setErrorMessage(error.message)
              return
            },
          )
      } else {
        firestore.update({collection: 'users', doc: userId}, update)
        setUpdated(true)
      }
    }
  }, [email, firebase, firestore, name, inputEmail, inputJobSeeker, inputName, lastName,
    inputLastName, inputPhone, inputRetraining, password, phone, setErrorMessage, userId])
  useFastForward(() => {
    if (inputName && inputLastName && inputEmail && inputPhone && password) {
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
    if (!inputPhone) {
      setPhone('0123456789')
    }
    if (!password) {
      setPassword('password')
    }
  })

  const buttonStyle: React.CSSProperties = {
    marginTop: 20,
    opacity: !inputName || !inputLastName || !inputEmail ||
      !inputPhone || (!password && !userId) ? 0.75 : 1,
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
  const inputPhoneStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: areErrorFields.phone ? colors.RED_ERROR : colors.SILVER_THREE,
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
      autoComplete="email" disabled={userId ? true : false}
      value={inputEmail} onChange={setEmail} />
    {areErrorFields.email ?
      <div style={errorMessageStyle}><sup>*</sup>{t('Champ obligatoire')}</div> :
      null}
    <Input
      placeholder={t('Numéro de téléphone')} style={inputPhoneStyle}
      autoComplete="phone"
      value={inputPhone} onChange={setPhone} type="tel" />
    {areErrorFields.phone ?
      <div style={errorMessageStyle}><sup>*</sup>{t('Champ obligatoire')}</div> :
      null}
    {userId ? null : <PasswordInput
      style={inputPasswordStyle} autoComplete="new-password"
      value={password} onChange={setPassword} />}
    {!userId && areErrorFields.password ?
      <div style={errorMessageStyle}>
        <sup>*</sup>{t('Champ obligatoire, vérifiez votre email')}
      </div> :
      null}
    <label style={checkboxLabelStyle}>
      <input defaultChecked={inputJobSeeker} onChange={handleJobSeeker} type="checkbox" />
      <Trans>Je suis en recherche d'emploi</Trans>
    </label>
    <label style={checkboxLabelStyle}>
      <input defaultChecked={inputRetraining} onChange={handleRetraining} type="checkbox" />
      <Trans>Je suis en reconversion professionnelle</Trans>
    </label>
    <Button type="secondLevel" onClick={onSave} style={buttonStyle} >
      {t('Valider')}
    </Button>
    {updated ? t('Vos informations ont été mises à jour.') : null}
    {isErrorDisplayed ? <div style={errorValidationStyle}>
      {t('Veuillez saisir les champs obligatoires pour continuer')}
    </div> : null}
    {errorMessage ? <div style={errorValidationStyle}>
      {errorMessage}
    </div> : null}
  </LayoutSignIn>
}

export default React.memo(AccountPage)
