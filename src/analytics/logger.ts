import {AllActions} from 'store/actions'
import {getPeopleToAlert} from 'store/selections'

import {AmplitudeLogger, Properties} from './amplitude'

export default class Logger implements AmplitudeLogger<AllActions, RootState> {
  private actionTypesToLog: {[T in AllActions['type']]?: string}

  private isFirstPage: boolean

  public constructor(actionTypesToLog: {[T in AllActions['type']]?: string}) {
    this.actionTypesToLog = actionTypesToLog
    this.isFirstPage = true
  }

  shouldLogAction(action: AllActions): boolean {
    return !!this.actionTypesToLog[action.type]
  }

  getEventName(action: AllActions): string {
    if (action.type === 'PAGE_IS_LOADED') {
      return `${this.actionTypesToLog[action.type] || action.type} ${action.pathname}`
    }
    return this.actionTypesToLog[action.type] || action.type
  }

  getEventProperties(action: AllActions, unusedState: RootState): Properties {
    if (action.type === 'PAGE_IS_LOADED') {
      const properties: Properties = {}
      if (this.isFirstPage) {
        properties.isFirstPage = true
        this.isFirstPage = false
      }
      return properties
    }
    if (action.type === 'ALERT_PERSON') {
      return {
        isAlertedAnonymously: action.isAlertedAnonymously,
        medium: action.alertMedium?.medium || 'self',
        sender: action.sender,
      }
    }
    if (action.type === 'COPY_PERSONAL_MESSAGE') {
      const {hasReferralUrl, isDefaultText} = action
      return {hasReferralUrl, isDefaultText}
    }
    if (action.type === 'FINISH_MEMORY_STEP') {
      const {numAddedPeople, step} = action
      return {numAddedPeople, step}
    }
    if (action.type === 'SHARE_APP') {
      const {medium, visualElement} = action
      return {medium, visualElement}
    }
    if (action.type === 'VISIT_DEEP_LINK') {
      const {target} = action
      return {target}
    }
    return {}
  }

  getUserId(unusedAction: AllActions, unusedState: RootState): string|undefined {
    return undefined
  }

  getUserProperties(action: AllActions, state: RootState): Properties|null {
    const {alerts, user: {chainDepth: stateChainDepth = 0, hasKnownRisk}} = state
    const chainDepth = action.type === 'SET_KNOWN_RISK' ? action.chainDepth : stateChainDepth
    return {
      countAlertedPeople: Object.keys(alerts).length,
      countAllPeople: getPeopleToAlert(state).length,
      isReferral: !!hasKnownRisk,
      referralDepth: chainDepth,
    }
  }
}
