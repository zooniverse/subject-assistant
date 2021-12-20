import React from 'react'

export const ASYNC_STATES = {
  IDLE: 'idle',
  SENDING: 'sending',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error',
}

export const API_RESPONSE = {
  STATUS: {
    NOT_FOUND: 'Not found.',
  },
  REQUEST_STATUS: {
    COMPLETED: 'completed',
    RUNNING: 'running',
    FAILED: 'failed',
  },
}

export const SELECTION_WITH_IMAGES = {
  AT_LEAST_ONE_IMAGE: 'with at least one image that is',
  EVERY_IMAGE: 'where every image is',
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

export function statusIcon (status) {
  switch (status) {
    case ASYNC_STATES.IDLE:
      return <i className="material-icons">more_horiz</i>
    case ASYNC_STATES.SUCCESS:
      return <i className="material-icons">done</i>
    case ASYNC_STATES.ERROR:
      return <i className="material-icons">error</i>
    case ASYNC_STATES.FETCHING:
    case ASYNC_STATES.SENDING:
      return <i className="material-icons">sync</i>
  }

  return null;
}
