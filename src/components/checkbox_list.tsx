import _without from 'lodash/without'
import DoneIcon from 'mdi-react/DoneIcon'
import MenuDownIcon from 'mdi-react/MenuDownIcon'
import React, {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'

import Button from 'components/button'

const _MAX_NUMBER_ITEMS = 10

const containerStyle: React.CSSProperties = {
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  fontSize: 14,
  listStyle: 'none',
  margin: '10px 0px 20px',
}
const checkboxStyle: React.CSSProperties = {
  display: 'inline-block',
  flex: '0 0 auto',
  height: 25,
  position: 'relative',
  width: 25,
}
const innerCheckboxStyle: React.CSSProperties = {
  alignItems: 'center',
  borderColor: colors.SILVER_THREE,
  borderRadius: 4,
  borderStyle: 'solid',
  borderWidth: 1,
  boxSizing: 'border-box',
  cursor: 'pointer',
  display: 'flex',
  fontSize: 16,
  height: 25,
  justifyContent: 'center',
  position: 'absolute',
  width: 25,
}
const labelStyle: React.CSSProperties = {
  marginLeft: 10,
}
const doneIconStyle: React.CSSProperties = {
  color: '#fff',
  fill: '#fff',
}

const typedMemo: <T>(c: T) => T = React.memo

interface CheckboxItemProps<T> {
  isSelected: boolean
  label: React.ReactNode
  onSelect: (value: T) => void
  value: T
}
const CheckboxItem = <T extends unknown>(props: CheckboxItemProps<T>): React.ReactElement => {
  const {isSelected, label, onSelect, value} = props
  const [isHovered, setIsHovered] = useState(false)

  const onMouseEnter = useCallback((): void => setIsHovered(true), [])
  const onMouseLeave = useCallback((): void => setIsHovered(false), [])

  const finalInnerCheckboxStyle: React.CSSProperties = {
    ...innerCheckboxStyle,
    backgroundColor: isSelected ? colors.ALMOST_DARK : '#fff',
    borderColor: isSelected || isHovered ? colors.ALMOST_DARK : colors.SILVER_THREE,
  }
  const finalContainerStyle: React.CSSProperties = {
    ...containerStyle,
    fontWeight: isSelected ? 'bold' : 'inherit',
  }

  const handleChange = useCallback((): void => {
    onSelect(value)
  }, [value, onSelect])

  return <div
    style={finalContainerStyle}
    onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
    onClick={handleChange}
  >
    <div style={checkboxStyle}>
      <div style={finalInnerCheckboxStyle}>
        {isSelected ? <DoneIcon style={doneIconStyle} /> : null}
      </div>
    </div>
    <div style={labelStyle}>{label}</div>
  </div>
}

interface ListProps<T> {
  list: {
    label: React.ReactNode
    value: T
  }[]
  onChange: (value: readonly T[]) => void
  valuesSelected: readonly T[]
}

// TODO(sil): Fix "see more" button size.
const CheckboxListBase = <T extends unknown = string>
(props: ListProps<T>): React.ReactElement => {
  const {list, onChange, valuesSelected} = props
  const {t} = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const mainList = list.slice(0, _MAX_NUMBER_ITEMS)
  const additionalList = list.slice(_MAX_NUMBER_ITEMS)
  const onSelect = useCallback((value: T): void => {
    const newValues = valuesSelected.includes(value) ?
      _without(valuesSelected, value) :
      [value].concat(valuesSelected)
    onChange(newValues)
  }, [onChange, valuesSelected])
  const handleOpenClick = useCallback((): void => {
    setIsExpanded(true)
  }, [])

  return <React.Fragment>
    {mainList.map(({label, value}, index: number) =>
      <CheckboxItem<T>
        value={value}
        key={index}
        isSelected={valuesSelected.includes(value)}
        onSelect={onSelect}
        label={label} />,
    )}
    {!additionalList.length ? null : isExpanded ? additionalList.map(
      ({label, value}, index: number) =>
        <CheckboxItem<T>
          value={value}
          key={`additional-${index}`}
          isSelected={valuesSelected.includes(value)}
          onSelect={onSelect}
          label={label} />,
    ) : <div><Button type="small" onClick={handleOpenClick}>
      {t('Afficher plus')}
      <MenuDownIcon />
    </Button></div>}
  </React.Fragment>
}

const CheckboxList = typedMemo(CheckboxListBase)

export default CheckboxList
