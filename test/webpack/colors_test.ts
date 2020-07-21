import {expect} from 'chai'

import {colorToAlpha} from 'components/colors'

describe('colorToAlpha', () => {
  it('should add an alpha to an RGB color', () => {
    expect(colorToAlpha('#ffffff', .1)).to.eq('rgba(255, 255, 255, 0.1)')
  })
})
