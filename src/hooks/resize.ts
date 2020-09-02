import {useCallback, useEffect, useState} from 'react'

const useWindowWidth = (): number => {
  const [width, setWidth] = useState(window.innerWidth)
  const updateWidth = useCallback(() => setWidth(window.innerWidth), [])
  useEffect((): (() => void) => {
    addEventListener('resize', updateWidth)
    return (): void => removeEventListener('resize', updateWidth)
  }, [updateWidth])
  return width
}

export {useWindowWidth}
