export const ASYNC_STATES = {
  IDLE: 'idle',
  SENDING: 'sending',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error',
}

export const API_RESPONSE = {
  REQUEST_STATUS: {
    COMPLETED: 'completed',
  },
}

export const SELECTION_OPERATORS = {
  LESS_THAN: '<=',
  GREATER_THAN: '>=',
}

export const SELECTION_THRESHOLDS = {
  MIN: 0,
  MAX: 100,
  DEFAULT: 50,
}

export function stopEvent (e) {
  // var eve = e || window.event
  e.preventDefault && e.preventDefault()
  e.stopPropagation && e.stopPropagation()
  e.returnValue = false
  e.cancelBubble = true
  return false
}
