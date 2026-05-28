export const APP_VISIBILITY_CHANGE_EVENT = 'termul:app-visibility-change'

export interface AppVisibilityChangeDetail {
  isVisible: boolean
}

export function dispatchAppVisibilityChange(isVisible: boolean): void {
  window.dispatchEvent(
    new CustomEvent<AppVisibilityChangeDetail>(APP_VISIBILITY_CHANGE_EVENT, {
      detail: { isVisible }
    })
  )
}
