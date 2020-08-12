import _without from 'lodash/without'
import DoneIcon from 'mdi-react/DoneIcon'
import React, {useCallback, useState} from 'react'

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
const spanStyle: React.CSSProperties = {
  marginLeft: 10,
}
const doneIconStyle: React.CSSProperties = {
  color: '#fff',
  fill: '#fff',
}

interface CheckboxItemProps {
  codeOgr: string
  name: string
  onSelect: (codeOgr: string) => void
  isPriority: boolean
  isSelected: boolean
}
const CheckboxItem = ({
  codeOgr, name, onSelect, isPriority, isSelected,
}: CheckboxItemProps): React.ReactElement => {
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
    fontWeight: (isPriority || isSelected) ? 'bold' : 'inherit',
  }

  const handleChange = useCallback((): void => {
    onSelect(codeOgr)
  }, [codeOgr, onSelect])

  return <div
    key={codeOgr}
    style={finalContainerStyle}
    onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
    onClick={handleChange}
  >
    <div style={checkboxStyle}>
      <div style={finalInnerCheckboxStyle}>
        {isSelected ? <DoneIcon style={doneIconStyle} /> : null}
      </div>
    </div>
    <span style={spanStyle}>{name}</span>
  </div>
}

interface ListProps {
  list: {
    codeOgr: string
    name: string
    isPriority: boolean
  }[]
  onChange: (value: string[]) => void
  valuesSelected: string[]
}

const CheckboxList = ({list, onChange, valuesSelected}: ListProps): React.ReactElement => {

  const onSelect = useCallback((codeOgr: string): void => {
    const newValues = valuesSelected.includes(codeOgr) ?
      _without(valuesSelected, codeOgr) :
      [codeOgr].concat(valuesSelected)
    onChange(newValues)
  }, [onChange, valuesSelected])

  return <React.Fragment>
    {list.map(({codeOgr, isPriority, name}, index: number) =>
      <CheckboxItem
        codeOgr={codeOgr}
        key={index}
        isPriority={isPriority} isSelected={valuesSelected.includes(codeOgr)}
        onSelect={onSelect}
        name={name} />,
    )}
  </React.Fragment>
}

export default React.memo(CheckboxList)
