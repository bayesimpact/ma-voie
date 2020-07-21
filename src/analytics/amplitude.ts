import {AmplitudeClient} from 'amplitude-js'

interface AmplitudeDefer {
  amplitude?: AmplitudeClient
  callbacks: ((amplitude: AmplitudeClient) => void)[]
}

// TODO(cyrille): Put in a middleware once we have a redux store.
const defer: AmplitudeDefer = {callbacks: []}
import(/* webpackChunkName: "amplitude" */ 'amplitude-js').then(({default: amplitudeJs}): void => {
  const instance = amplitudeJs.getInstance()
  defer.amplitude = instance
  instance.setVersionName(config.clientVersion)
  // More info about Amplitude client options:
  // https://amplitude.zendesk.com/hc/en-us/articles/115001361248#settings-configuration-options
  instance.init(config.amplitudeToken, undefined, {
    includeGclid: true,
    includeReferrer: true,
    includeUtm: true,
    saveParamsReferrerOncePerSession: false,
  })
  defer.callbacks.forEach((callback): void => callback(instance))
})

const logPageToAmplitude = (amplitude: AmplitudeClient, pathname: string): void => {
  amplitude.logEvent(`Page is loaded ${pathname}`, {})
}

export const logPage = (pathname: string): void => {
  if (defer.amplitude) {
    logPageToAmplitude(defer.amplitude, pathname)
  } else {
    defer.callbacks.push(amplitude => logPageToAmplitude(amplitude, pathname))
  }
}
