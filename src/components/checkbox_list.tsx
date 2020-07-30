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
  index: number
  name: string
  onSelect: (index: number) => void
  isSelected: boolean
}
const CheckboxItem = ({
  index, name, onSelect, isSelected,
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
    fontWeight: isSelected ? 'bold' : 'inherit',
  }

  const handleChange = useCallback((): void => {
    onSelect(index)
  }, [index, onSelect])

  return <div
    key={index}
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

// TODO(émilie): add a <value> field in each list item to
// manage the order (and drop usage of <index>)
interface ListProps {
  list: {
    name: string
  }[]
}

// FIXME(émilie): get the list of selectedValues from parent
// + callback onChange from parent
const CheckboxList = ({list}: ListProps): React.ReactElement => {
  const [valuesSelected, setValuesSelected] = useState<readonly number[]>([])

  const onSelect = useCallback((index: number): void => {
    const newValues = valuesSelected.includes(index) ?
      _without(valuesSelected, index) :
      [index].concat(valuesSelected)
    setValuesSelected(newValues)
  }, [valuesSelected])

  return <React.Fragment>
    {list.map((element, index) =>
      <CheckboxItem
        key={index}
        isSelected={valuesSelected.includes(index)}
        onSelect={onSelect}
        index={index} name={element.name} />,
    )}
  </React.Fragment>
}

export default React.memo(CheckboxList)
