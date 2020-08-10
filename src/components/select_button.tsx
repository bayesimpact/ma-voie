import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {Page, getPath} from 'store/url'

import Button from 'components/button'

const typedMemo: <T>(c: T) => T = React.memo

const buttonContainerStyle: React.CSSProperties = {
  display: 'block',
  paddingTop: 20,
}
const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

interface ButtonBaseProps<T> {
  name: string
  onClick: (value: T) => void
  page: Page
  value: T
}
const SelectButtonBase = <T extends unknown>(props: ButtonBaseProps<T>): React.ReactElement => {
  const {name, onClick, page, value} = props
  const [translate] = useTranslation()
  const handleClick = useCallback((): void => {
    onClick(value)
  }, [onClick, value])
  return <div style={buttonContainerStyle}>
    <Link to={getPath(page, translate)} style={linkStyle}>
      <Button type="variable" onClick={handleClick}>
        {translate(name)}
      </Button>
    </Link>
  </div>
}

const SelectButton = typedMemo(SelectButtonBase)

export default SelectButton
