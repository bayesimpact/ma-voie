import React, {useCallback, useEffect, useState} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useFirebase, useFirestore} from 'react-redux-firebase'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'

import {useFastForward} from 'hooks/fast_forward'
import {RootState} from 'store/actions'
import {LocalizableOption, localizeOptions, prepareT} from 'store/i18n'
import {useUserId} from 'store/selections'
import {getPath} from 'store/url'
import {validateEmail} from 'store/validations'

import Button from 'components/button'
import Input from 'components/input'
import LayoutSignIn from 'components/layout_sign_in'
import PasswordInput from 'components/password_input'
import {SelectList} from 'components/select'

const getUniqueExampleEmail = (): string => `test-${new Date().getTime()}@example.com`

const DIPLOMA_OPTIONS: readonly LocalizableOption<bayes.maVoie.Diploma>[] = [
  {name: prepareT('CAP - BEP'), value: 'cap-bep'},
  {name: prepareT('Bac - Bac Pro'), value: 'bac'},
  {name: prepareT('BTS - DUT - DEUG'), value: 'bac+2'},
  {name: prepareT('Licence - Maîtrise'), value: 'bac+3'},
  {name: prepareT('DEA - DESS - Master - PhD'), value: 'bac+5'},
]

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
const linkStyle: React.CSSProperties = {
  color: colors.NEON_BLUE,
}
// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const AccountPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const history = useHistory()
  const firebase = useFirebase()
  const firestore = useFirestore()

  const userId = useUserId()
  const isConnected = userId !== undefined
  const {areLegalMentionsAccepted, diploma, email, lastName, name, phone, jobSeeker,
    retraining} = useSelector(({firebase: {profile}}: RootState) => profile)
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

  const [inputDiploma, setInputDiploma] = useState(diploma || undefined)
  const handleDiploma = useCallback((value: bayes.maVoie.Diploma): void => {
    setInputDiploma(value)
  }, [setInputDiploma])

  const [inputRetraining, setRetraining] = useState(retraining || false)
  const handleRetraining = useCallback((e): void => {
    setRetraining(e.target.checked)
  }, [setRetraining])

  const [inputLegals, setLegals] = useState(areLegalMentionsAccepted || false)
  const handleLegals = useCallback((e): void => {
    setLegals(e.target.checked)
  }, [])

  const [password, setPassword] = useState('')
  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false)
  const [areErrorFields, setAreErrorFields] =
    useState<{[K in 'diploma'|'email'|'inputLegals'|'lastName'|'name'|'password'|'phone'|
    'phoneLength']?: boolean}>({})
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
      diploma: !inputDiploma,
      email: !inputEmail || !isEmailValid,
      inputLegals: !inputLegals,
      lastName: !inputLastName,
      name: !inputName,
      password: !password && !userId,
      phone: !inputPhone,
      phoneLength: !!inputPhone && inputPhone.length < 8,
    }
    setAreErrorFields(errorsFields)
    if (Object.values(errorsFields).some(field => field)) {
      return
    }
    setIsErrorDisplayed(false)
    const utmSource = localStorage.getItem('utm_source')
    const update = {
      ...diploma === inputDiploma ? {} : {diploma: inputDiploma},
      ...name === inputName ? {} : {name: inputName},
      ...lastName === inputLastName ? {} : {lastName: inputLastName},
      ...email === inputEmail || userId ? {} : {email: inputEmail},
      ...phone === inputPhone ? {} : {phone: inputPhone},
      ...inputJobSeeker ? {jobSeeker: true} : {jobSeeker: false},
      ...inputRetraining ? {retraining: true} : {retraining: false},
      ...utmSource ? {source: utmSource} : {},
      areLegalMentionsAccepted: inputLegals,
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
  }, [diploma, email, firebase, firestore, name, inputDiploma, inputEmail, inputJobSeeker,
    inputLegals, inputName, lastName, inputLastName, inputPhone, inputRetraining, password, phone,
    setErrorMessage, userId])
  useFastForward(() => {
    if (inputName && inputLastName && inputEmail && inputPhone && password && inputDiploma) {
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
    if (!inputDiploma) {
      setInputDiploma('bac+2')
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

  const inputDiplomaStyle: React.CSSProperties = {
    borderColor: areErrorFields.diploma ? colors.RED_ERROR : colors.SILVER_THREE,
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
    borderColor: (areErrorFields.phone || areErrorFields.phoneLength) ?
      colors.RED_ERROR : colors.SILVER_THREE,
  }
  const inputPasswordStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: areErrorFields.password ? colors.RED_ERROR : colors.SILVER_THREE,
  }
  const inputLegalsStyle: React.CSSProperties = {
    ...checkboxLabelStyle,
    color: areErrorFields.inputLegals ? colors.RED_ERROR : 'inherit',
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
      <div style={errorMessageStyle}><sup>*</sup>{t('Adresse email incorrecte')}</div> :
      null}
    <Input
      placeholder={t('Numéro de téléphone')} style={inputPhoneStyle}
      autoComplete="phone"
      value={inputPhone} onChange={setPhone} type="tel" />
    {areErrorFields.phone ?
      <div style={errorMessageStyle}><sup>*</sup>{t('Champ obligatoire')}</div> :
      areErrorFields.phoneLength ?
        <div style={errorMessageStyle}><sup>*</sup>{t('Numéro de téléphone non valide')}</div> :
        null}
    {userId ? null : <PasswordInput
      style={inputPasswordStyle} autoComplete="new-password"
      value={password} onChange={setPassword} />}
    {!userId && areErrorFields.password ?
      <div style={errorMessageStyle}>
        <sup>*</sup>{t('Champ obligatoire, vérifiez votre email')}
      </div> :
      null}
    <SelectList style={inputDiplomaStyle}
      options={localizeOptions(t, DIPLOMA_OPTIONS)} onChange={handleDiploma}
      placeholder={t('Plus haut diplôme obtenu')}
      value={inputDiploma} />
    <label style={checkboxLabelStyle}>
      <input defaultChecked={inputJobSeeker} onChange={handleJobSeeker} type="checkbox" />
      <Trans>Je suis demandeur d'emploi</Trans>
    </label>
    <label style={checkboxLabelStyle}>
      <input defaultChecked={inputRetraining} onChange={handleRetraining} type="checkbox" />
      <Trans>Je suis en reconversion professionnelle</Trans>
    </label>
    {!isConnected || !areLegalMentionsAccepted ?
      <label style={inputLegalsStyle}>
        <input onChange={handleLegals} type="checkbox" />
        <Trans>J'ai lu et j'accepte les <Link to={getPath(['TERMS'], t)} style={linkStyle}>
          Mentions légales</Link></Trans>
      </label> : null}
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
