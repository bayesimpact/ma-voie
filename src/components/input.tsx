import React, {useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react'

type HTMLInputElementProps = React.HTMLProps<HTMLInputElement>
export interface InputProps
  extends Pick<HTMLInputElementProps, Exclude<keyof HTMLInputElementProps, 'onChange' | 'ref'>> {
  onChange?: (inputValue: string) => void
  onEdit?: (inputValue: string) => void
  shouldFocusOnMount?: boolean
  value?: string
}


// TODO(cyrille): Set pseudo-element styles using Radium, rather than App.css.
const Input = (props: InputProps, ref: React.Ref<Inputable>): React.ReactElement => {
  const {onChange, onEdit, shouldFocusOnMount, style, value: propValue,
    ...otherProps} = props
  const dom = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, (): Inputable => ({
    blur: (): void => dom.current?.blur(),
    focus: (): void => dom.current?.focus(),
    select: (): void => dom.current?.select(),
  }))

  const isDelayed = !!onEdit

  const [stateValue, setStateValue] = useState(propValue || '')

  useEffect((): void => {
    if (shouldFocusOnMount) {
      dom.current?.focus()
    }
  }, [shouldFocusOnMount])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation()
    const value = event.target.value
    if (isDelayed) {
      setStateValue(value)
      onEdit?.(value)
    } else {
      onChange?.(value)
    }
  }, [onChange, onEdit, isDelayed])

  const inputValue = isDelayed ? stateValue : propValue

  const inputStyle: React.CSSProperties = {
    borderRadius: 0,
    color: 'inherit',
    fontSize: 15,
    fontWeight: 'normal',
    height: 41,
    paddingLeft: 15,
    ...style,
  }
  return <input
    {...otherProps} style={inputStyle} onChange={handleChange} value={inputValue} ref={dom} />
}
export default React.memo(React.forwardRef(Input))

export interface Inputable {
  blur: () => void
  focus: () => void
  select: () => void
}
