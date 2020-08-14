import i18next, {InitOptions, ReadCallback, ResourceKey, Services, TFunction, TOptions,
  i18n} from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import _memoize from 'lodash/memoize'
import {initReactI18next} from 'react-i18next'


// Backend for i18next to load resources for languages only when they are needed.
// It takes a backend config with a promise per language and per namespace.
class PromiseI18nBackend {
  public static type = 'backend' as const

  private importFunc: PromiseImportFunc|undefined

  public init(services: Services, backendOptions: PromiseImportFunc): void {
    this.importFunc = backendOptions
  }

  public read(language: string, namespace: string, callback: ReadCallback): void {
    if (!this.importFunc) {
      callback(null, {})
      return
    }
    this.importFunc(language, namespace).
      then((resources): void => callback(null, resources.default)).
      catch((): void => callback(null, {}))
  }
}

const updateDomLang = (lang: string): void => {
  document.documentElement.setAttribute('lang', lang)
}

// Third party module for i18next to update the "lang" attribute of the document's root element
// (usually html) so that it stays in sync with i18next language.
const UpdateDocumentElementLang = {
  init: (i18next: i18n): void => {
    updateDomLang(i18next.language)
    i18next.on('languageChanged', updateDomLang)
  },
  type: '3rdParty',
} as const

const whitelist = ['fr', 'en'] as const

const STATIC_NAMESPACE = 'static'
const importStatic = (lang: string): Promise<{default: ResourceKey}> => {
  const privacy = import(`translations/${lang}/privacy.txt`)
  const terms = import(`translations/${lang}/terms.txt`)
  return Promise.all([privacy, terms]).then(
    ([{default: privacy}, {default: termsOfService}]) => ({default: {privacy, termsOfService}}))
}

const init = (initOptions?: InitOptions): void => {
  i18next.
    use(initReactI18next).
    use(LanguageDetector).
    use(PromiseI18nBackend).
    use(UpdateDocumentElementLang).
    init({
      backend: (language: string, namespace: string): Promise<{default: ResourceKey}> =>
        namespace === STATIC_NAMESPACE ? importStatic(language) :
          import(`translations/${language}/${namespace}_i18next.json`),
      detection: {
        lookupQuerystring: 'hl',
        order: ['querystring'],
      },
      fallbackLng: 'fr',
      interpolation: {
        escapeValue: false,
      },
      keySeparator: false,
      nsSeparator: false,
      react: {
        defaultTransParent: 'div',
      },
      saveMissing: false,
      // TODO(cyrille): Update i18next to allow readonly whitelist.
      whitelist: [...whitelist],
      ...initOptions,
    })
}

// This type is just a marker for a string that will be extracted for translation,
// so it should be translated.
interface Localizable {
  __unreachable?: never
}
export type LocalizableString<T extends string = string> = T & Localizable

export interface WithLocalizableName<T extends string = string> {
  readonly name: LocalizableString<T>
}

export interface LocalizableOption<O, T extends string = string> extends WithLocalizableName<T> {
  value: O
}
function localizeOptions<T extends WithLocalizableName>(
  translate: TFunction, options: readonly T[], tOptions?: TOptions):
  readonly (Omit<T, 'name'> & {name: string})[] {
  return options.map(({name, ...other}) => ({name: translate(name, tOptions), ...other}))
}
// Marker for string to be extracted for translation.
function prepareT<T extends string = string>(str: T, unusedOptions?: TOptions):
LocalizableString<T> {
  return str as LocalizableString<T>
}

type PromiseImportFunc = (language: string, namespace: string) => Promise<{default: ResourceKey}>


const extractSeparator = _memoize((listString: string): readonly [string, string] => {
  const parts = listString.split(/<\d><\/\d>/)
  if (parts.length !== 4) {
    return [', ', ' et ']
  }
  return parts.slice(1, 3) as [string, string]
})


const joinList = (values: readonly string[], t: TFunction): string => {
  const [separator, lastSeparator] = extractSeparator(t('<0></0>, <1></1> et <2></2>'))
  if (values.length <= 1) {
    return values.join(lastSeparator)
  }
  return values.slice(0, -1).join(separator) + lastSeparator + values.slice(-1)[0]
}

export {init, joinList, localizeOptions, prepareT, STATIC_NAMESPACE}
