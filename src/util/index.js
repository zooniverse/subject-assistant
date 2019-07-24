export const ASYNC_STATES = {
  IDLE: 'idle',
  SENDING: 'sending',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error',
}

export function stopEvent (e) {
  // var eve = e || window.event
  e.preventDefault && e.preventDefault()
  e.stopPropagation && e.stopPropagation()
  e.returnValue = false
  e.cancelBubble = true
  return false
}
