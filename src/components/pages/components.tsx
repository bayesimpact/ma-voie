import React from 'react'

import Button from 'components/button'
import ButtonWithIcon from 'components/button_with_icon'
import Layout from 'components/layout'
import Tip from 'components/tip'

const onClick = (): void => window.alert('Bientôt disponible...')

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const ComponentsPage = (): React.ReactElement => {
  return <Layout header="Header title" title="Layout title" bigTitle="Layout big title">
    <br />
    <Button type="firstLevel" onClick={onClick}>Button firstLevel</Button>
    <br />
    <Button type="secondLevel" onClick={onClick}>Button secondLevel</Button>
    <br />
    <Button type="variable" onClick={onClick}>Button variable</Button>
    <br />
    <Button type="discreet" onClick={onClick}>Button discreet</Button>
    <br />
    <Button type="specific" onClick={onClick}>Button specific</Button>
    <br />
    <Button type="menu" onClick={onClick}>Button menu</Button>
    <br />
    <ButtonWithIcon type="email" onClick={onClick}>Button Email</ButtonWithIcon>
    <br />
    <ButtonWithIcon type="facebook" onClick={onClick}>Button Facebook</ButtonWithIcon>
    <br />
    <ButtonWithIcon type="google" onClick={onClick}>Button Google</ButtonWithIcon>
    <br />
    <Tip title="Astuce">
      Vous pouvez utiliser votre crédit CPF pour financer votre formation.
    </Tip>
  </Layout>
}

export default React.memo(ComponentsPage)
