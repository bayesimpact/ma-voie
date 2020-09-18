import EyeIcon from 'mdi-react/EyeIcon'
import EyeOffIcon from 'mdi-react/EyeOffIcon'
import React, {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'

import Input, {InputProps} from 'components/input'


const showPasswordButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: colors.GREY,
  cursor: 'pointer',
  padding: 15,
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
}


interface Props extends InputProps {
  value?: string
  style?: React.CSSProperties
}


const PasswordInput = (props: Props): React.ReactElement => {
  const {t} = useTranslation()
  const {style, value, ...otherProps} = props
  const {
    margin = undefined,
    marginBottom = undefined,
    marginLeft = undefined,
    marginRight = undefined,
    marginTop = undefined,
    ...inputStyle
  } = style || {}
  const containerStyle: React.CSSProperties = {
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    position: 'relative',
  }
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const togglePasswordShown = useCallback((): void =>
    setIsPasswordShown((wasShown) => !wasShown), [])
  return <div style={containerStyle}>
    <Input
      placeholder={t('Mot de passe')} style={inputStyle}
      type={isPasswordShown ? 'text' : 'password'}
      value={value} {...otherProps} />
    {value ? <button style={showPasswordButtonStyle} onClick={togglePasswordShown} type="button">
      {isPasswordShown ? <EyeIcon aria-label={t('Cacher le mot de passe')} /> :
        <EyeOffIcon aria-label={t('Montrer le mot de passe')} />}
    </button> : null}
  </div>
}


export default React.memo(PasswordInput)
