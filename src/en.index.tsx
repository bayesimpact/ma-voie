// TODO(pascal): Fix the snippet if we launch in English.
import snippetImage from 'images/snippet.jpg'

import {makeIndexHtml} from '.'

export default (): string => makeIndexHtml('en', snippetImage)
