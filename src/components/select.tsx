import React, {useCallback, useMemo, CSSProperties} from 'react'
import ReactSelect from 'react-select'

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

// TODO(émilie): Consider dropping name for the benefit of label
// (to avoid the selectOptions trick further)
interface SelectOption<T = string> {
  label?: string
  name: string
  value: T
}

const buttonStyle: React.CSSProperties = {
  marginTop: 20,
}

interface SelectProps<T> {
  onChange: (value: T) => void
  options: readonly SelectOption<T>[]
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

const containerSelectStyle: React.CSSProperties = {
  marginTop: 20,
}
const controlSelectStyle: React.CSSProperties = {
  borderRadius: 15,
}
const valueContainerSelectStyle: React.CSSProperties = {
  marginLeft: 15,
}
const selectStyle: React.CSSProperties = {
  height: 61,
  lineHeight: '24px',
  padding: '18px 25px',
  width: '100%',
}

interface SelectListProps<T> {
  onChange: (value: T) => void
  options: readonly SelectOption<T>[]
  placeholder?: string
  style?: React.CSSProperties
  value?: T
}
const SelectListBase = <T extends unknown = string>(props: SelectListProps<T>):
React.ReactElement => {
  const {onChange, options, placeholder, style, value} = props
  const handleChange = useCallback(
    (option?: SelectOption<T>|null): void => {
      if (!option) {
        return
      }
      const {value: newValue} = option
      onChange(newValue)
    },
    [onChange],
  )
  const selectOptions = options.map((option) => {
    return {...option, label: option.name}
  })
  const valueProp = useMemo(
    (): SelectOption<T> | undefined =>
      selectOptions.find(({value: optionValue}): boolean => value === optionValue),
    [selectOptions, value])

  return <div style={style}>
    <ReactSelect<SelectOption<T>, false>
      options={selectOptions}
      onChange={handleChange}
      styles={{
        container: (base): CSSProperties => ({...base, ...containerSelectStyle}),
        control: (base): CSSProperties => ({...base, ...controlSelectStyle, ...style}),
        input: (base): CSSProperties => ({...base, ...selectStyle}),
        valueContainer: (base): CSSProperties => ({...base, ...valueContainerSelectStyle}),
      }}
      placeholder={placeholder} value={valueProp} />
  </div>
}

const SelectList = typedMemo(SelectListBase)

const Select = typedMemo(SelectBase)

export {Select, SelectList}
