import React, {useCallback, useEffect, useImperativeHandle,
  useMemo, useRef, useState} from 'react'
import algoliasearch from 'algoliasearch'
import autocomplete, {Highlighted} from 'autocomplete.js/index'

import algoliaLogoUrl from 'images/algolia.svg'

require('styles/algolia.css')

const ALGOLIA_APP = 'K6ACI9BKKT'
const ALGOLIA_API_KEY = 'da4db0bf437e37d6d49cefcb8768c67a'
const ALGOLIA_JOB_INDEX = 'jobs'


interface AlgoliaSuggestProps<T> {
  // API key of the Algolia app.
  algoliaApiKey: string
  // ID of the Algolia app.
  algoliaApp: string
  // Name of the index to use in the Algolia app.
  algoliaIndex: string
  autoselect?: boolean
  autoselectOnBlur?: boolean
  disabled?: boolean
  // A function to use on suggestion to compute the visible input. Overrides
  // displayKey.
  display?: (suggestion: T) => string
  // Key to use as visible input when a suggestion is selected. Is overriden
  // by display.
  displayKey?: keyof T
  // A value to set inside the field programatically.
  displayValue?: string
  hint?: boolean
  // Numbers of suggestions shown when typing.
  hitsPerPage?: number
  onBlur?: () => void
  // Function called when the value changed either when the text changes or
  // when a suggestion is selected. It takes 3 arguments: the browser event,
  // the displayed value, and in the case of a suggestion selected, the
  // suggestion object.
  onChange?: (
    event: Event|React.ChangeEvent<HTMLInputElement>,
    displaySuggestion: string,
    suggestion: T|null
  ) => void
  onFocus?: () => void
  // Function called when a selection is suggested. It takes 3 arguments:
  // the event, the displayed value, and the suggestion object.
  onSuggestSelect?: (event: Event, displaySuggestion: string, suggestion: T) => void
  // A string to display in the input field when no text is entered.
  placeholder?: string
  // Style to use for the input field.
  style?: React.CSSProperties
  // Rendering function for each suggestion.
  suggestionTemplate?: (suggestion: Highlighted<T>) => string
}


// An autocomplete input using Algolia as a backend.
// TODO: Contribute to autocomplete.js.
const AlgoliaSuggestBase = <T extends Record<string, unknown>>(
  props: AlgoliaSuggestProps<T>, ref: React.Ref<Focusable>,
): React.ReactElement => {
  const {
    algoliaApiKey,
    algoliaApp,
    algoliaIndex,
    autoselect,
    autoselectOnBlur,
    disabled,
    display,
    displayKey,
    displayValue,
    hint,
    hitsPerPage,
    onBlur,
    onChange,
    onFocus,
    onSuggestSelect,
    placeholder,
    style,
    suggestionTemplate,
  } = props

  const [suggest, setSuggest] = useState<ReturnType<typeof autocomplete>|undefined>()
  const cleanDisplayValue = displayValue || ''
  useEffect((): void => {
    suggest?.autocomplete?.setVal(cleanDisplayValue)
  }, [cleanDisplayValue, suggest])

  const styleDisplay = style?.display || 'initial'
  const hintRef = useRef<HTMLElement>()
  useEffect((): void => {
    if (hintRef.current) {
      hintRef.current.style.display = styleDisplay
    }
  }, [styleDisplay])

  const displayKeyRef = useRef(displayKey)
  useEffect((): void => {
    displayKeyRef.current = displayKey
  }, [displayKey])

  const displayFunc = useCallback(((suggestion: T): string => {
    const displayKey = displayKeyRef.current
    return displayKey && (suggestion[displayKey] as unknown as string) || ''
  }), [])

  const node = useRef<HTMLInputElement>(null)

  useEffect((): void => {
    const algoliaClient = algoliasearch(algoliaApp, algoliaApiKey)
    if (!node.current) {
      return
    }
    // TODO(pascal): Rethink this pattern as this is not compatible with React.
    // Modifying the DOM without React is somewhat OK, but here it changes the
    // main DOM element of this component which confuses React when trying to
    // update the components before it.
    const newSuggest = autocomplete(node.current, {autoselect, autoselectOnBlur, hint}, [
      {
        display: display || displayFunc,
        source: autocomplete.sources.hits<T>(
          algoliaClient.initIndex(algoliaIndex), {hitsPerPage}),
        templates: {
          footer: '<div class="aa-footer">recherche rapide grâce à ' +
            '<img src="' + algoliaLogoUrl + '" alt="Algolia"/></div>',
          suggestion: suggestionTemplate,
        },
      },
    ])
    setSuggest(newSuggest)
    // The hint object get styled by the autocomplete lib by copying the
    // initial style of the input. That is a problem because later we allow our
    // component to change this style (so we need to update the hint object
    // manually in componentDidUpdate).
    hintRef.current = newSuggest.get(0).previousSibling as HTMLElement
    // As the style is copied over from the input, to make it more look like a
    // hint we change only the opacity.
    if (hintRef.current) {
      hintRef.current.style.opacity = '.5'
    }
  }, [
    algoliaApiKey, algoliaApp, algoliaIndex, display, displayFunc, hitsPerPage, suggestionTemplate,
    autoselect, autoselectOnBlur, hint,
  ])

  useEffect((): void => {
    if (!suggest) {
      return
    }
    const handleSelected = (event: Event, suggestion: T): void => {
      const displaySuggestion = displayFunc(suggestion)
      onSuggestSelect?.(event, displaySuggestion, suggestion)
      onChange?.(event, displaySuggestion, suggestion)
    }
    suggest.on('autocomplete:selected', handleSelected)
    suggest.on('autocomplete:autocompleted', handleSelected)
  }, [displayFunc, onChange, onSuggestSelect, suggest])

  useImperativeHandle(ref, (): Focusable => ({
    focus: (): void => node.current?.focus(),
  }))

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.(event, event.target.value, null)
  }, [onChange])
  const wrappedOnChange = onChange && handleChange

  // TODO(pascal): Also style with focus and hover effects like the other inputs.
  return <input
    onChange={wrappedOnChange} ref={node} style={style} placeholder={placeholder}
    onFocus={onFocus} disabled={disabled} onBlur={onBlur} />
}
// TODO(pascal): Remove the type assertion once we understand how
// https://github.com/Microsoft/TypeScript/issues/9366 should work.
const AlgoliaSuggest = React.forwardRef(AlgoliaSuggestBase) as <T>(
  props: AlgoliaSuggestProps<T> & {ref?: React.Ref<Focusable>},
) => React.ReactElement


function maybeLowerFirstLetter(word: string, isLowercased: boolean): string {
  if (!isLowercased || !word) {
    return word
  }
  // Matches the first visible letter (ignoring HTML tag that would come
  // before): e.g. "Fireman" => "F", "<em>Gre</em>mlin" => "G".
  const matchFirstLetter = word.match(/^(<.*?>)?(\w)(.*)$/)
  if (!matchFirstLetter) {
    return word
  }
  return (matchFirstLetter[1] || '') + matchFirstLetter[2].toLowerCase() + matchFirstLetter[3]
}


interface JobSuggestion {
  readonly codeOgr: string
  readonly libelleRome: string
  readonly codeRome: string
  readonly libelleAppellationCourt: string
  readonly libelleAppellationCourtFeminin: string
  readonly libelleAppellationCourtMasculin: string
  readonly libelleAppellationLong: string
  readonly libelleAppellationLongFeminin?: string
  readonly libelleAppellationLongMasculin?: string
  readonly jobGroupId?: string
  readonly jobGroupName?: string
  readonly name?: string
  readonly objectID: string
}


type Mutable<T> = {-readonly [K in keyof T]?: T[K]}

interface Focusable {
  focus: () => void
}

interface SuggestConfig<T, SuggestT> {
  algoliaIndex?: string
  disabled?: boolean
  errorDelaySeconds?: number
  hitsPerPage?: number
  isLowercased?: boolean
  onChange?: (value: T|null) => void
  onError?: () => void
  onFocus?: () => void
  onSuggestSelect?: (event: Event, displaySuggestion: string, suggestion: SuggestT) => void
  placeholder?: string
  style?: React.CSSProperties
  // Set or change to update the text value programatically.
  textValue?: string
  value?: T
}


type SuggestProps<T, SuggestT> = SuggestConfig<T, SuggestT>


// Assemble a Job proto from a JobSuggest suggestion.
function jobFromSuggestion(suggestion?: JobSuggestion): bayes.maVoie.Job|null {
  if (!suggestion) {
    return null
  }
  const job: Mutable<bayes.maVoie.Job> = {
    codeOgr: suggestion.codeOgr || suggestion.objectID,
    jobGroup: {
      name: suggestion.jobGroupName || suggestion.libelleRome,
      romeId: suggestion.jobGroupId || suggestion.codeRome,
    },
    name: suggestion.name || suggestion.libelleAppellationCourt,
  }
  return job
}


// A Job autocomplete input.
const JobSuggestBase:
React.RefForwardingComponent<Focusable, SuggestProps<bayes.maVoie.Job, JobSuggestion>> =
(props: SuggestProps<bayes.maVoie.Job, JobSuggestion>, ref: React.Ref<Focusable>):
React.ReactElement => {
  const {errorDelaySeconds = 3, isLowercased, style, onChange,
    onError, textValue, value, ...otherProps} = props
  const [jobName, setJobName] = useState(textValue || '')
  const hasError = useMemo((): boolean => !!jobName && !value, [jobName, value])

  useEffect((): void => {
    if (value && value.codeOgr) {
      setJobName(maybeLowerFirstLetter(value.name || '', !!isLowercased))
    } else if (typeof textValue === 'string') {
      setJobName(textValue)
    }
  }, [isLowercased, textValue, value])

  const timeout = useRef<ReturnType<typeof setTimeout>|null>(null)

  const renderSuggestion = useCallback(
    (suggestion: Highlighted<JobSuggestion>): string => {
      // TODO(consider adding a neutral name with inclusive writing).
      const name = suggestion?._highlightResult?.libelleAppellationLongMasculin?.value || ''
      return '<div>' + maybeLowerFirstLetter(name, !!isLowercased) + '</div>'
    }, [isLowercased])

  const handleChange = useCallback((
    event: Event|React.ChangeEvent<HTMLInputElement>,
    value: string,
    suggestion: JobSuggestion|null,
  ): void => {
    event.stopPropagation()
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    timeout.current = setTimeout((): void => {
      hasError && onError && onError()
    }, errorDelaySeconds * 1000)

    if (!suggestion) {
      setJobName(value)
      onChange && onChange(null)
      return
    }
    const job = jobFromSuggestion(suggestion)
    onChange && onChange(job)
  }, [errorDelaySeconds, hasError, onChange, onError])

  const handleBlur = useCallback((): void => {
    hasError && onError && onError()
  }, [hasError, onError])

  // TODO(cyrille): Add a prop for `errorStyle`.
  const fieldStyle = useMemo(() => ({
    ...style,
    ...hasError && {borderColor: colors.REDDISH_ORANGE},
  }), [hasError, style])

  const display = useCallback(
    (suggestion: JobSuggestion): string =>
      maybeLowerFirstLetter(suggestion.libelleAppellationCourt, !!isLowercased),
    [isLowercased],
  )

  return <AlgoliaSuggest<JobSuggestion>
    {...otherProps}
    algoliaIndex={ALGOLIA_JOB_INDEX}
    algoliaApp={ALGOLIA_APP} algoliaApiKey={ALGOLIA_API_KEY}
    displayValue={jobName} hint={true} autoselect={true} hitsPerPage={5}
    autoselectOnBlur={true} style={fieldStyle} display={display}
    onBlur={handleBlur} onChange={handleChange} ref={ref}
    suggestionTemplate={renderSuggestion} />
}
export default React.memo(React.forwardRef(JobSuggestBase))
