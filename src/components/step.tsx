import React from 'react'

interface Props {
  children: React.ReactNode
  isOpen?: boolean
}
const Step = ({children, isOpen}: Props): React.ReactElement =>
  <div>{children}{isOpen ? ' Bientôt disponible...' : ''}</div>

export default React.memo(Step)
