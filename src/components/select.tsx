import React, {useCallback} from 'react'

import Button from 'components/button'

const typedMemo: <T>(c: T) => T = React.memo

interface ButtonBaseProps<T> {
  children: string
  onClick: (value: T) => void
  style?: React.CSSProperties
  value: T
}
const SelectButtonBase = <T extends unknown>(props: ButtonBaseProps<T>): React.ReactElement => {
  const {children, onClick, style, value} = props
  const handleClick = useCallback((): void => {
    onClick(value)
  }, [onClick, value])
  return <Button style={style} type="variable" onClick={handleClick}>
    {children}
  </Button>
}
const SelectButton = typedMemo(SelectButtonBase)

const buttonStyle: React.CSSProperties = {
  marginTop: 20,
}

interface SelectProps<T> {
  onChange: (value: T) => void
  options: readonly {
    name: string
    value: T
  }[]
  style?: React.CSSProperties
  // TODO(cyrille): Use this to show the selected option (if any) with a different style.
  value?: T
}
const SelectBase = <T extends unknown = string>(props: SelectProps<T>): React.ReactElement => {
  const {onChange, options, style} = props
  const onSelect = useCallback((value: T) => onChange(value), [onChange])
  return <div style={style}>
    {options.map(({name, value}, index) =>
      <SelectButton
        onClick={onSelect} value={value}
        style={index ? buttonStyle : undefined} key={index}>
        {name}
      </SelectButton>)}
  </div>
}

export default typedMemo(SelectBase)
