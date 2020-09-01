import React, {useCallback} from 'react'
import {useHistory} from 'react-router'

import Menu from 'components/menu'

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const MenuPage = (): React.ReactElement => {
  const history = useHistory()
  const goBackClick = useCallback((): void => {
    history.goBack()
  }, [history])
  return <Menu onClose={goBackClick} />
}

export default React.memo(MenuPage)
