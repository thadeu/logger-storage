import { setItem, getItem } from './storage'
export { clear } from './storage'
export { all, filter, logs, errors, warns, infos } from './filters'

export function options(options) {
  options = options || {};

  const override = options.override || false;
  
  const clearAlways = options.clearAlways || false;

  onOverride(override)
  
  if (clearAlways) {
    window.onload = () => clearStore()
  }

  return {
    ...options,
    isOverride: () => override,
    clearAlways: () => clearAlways
  }
}

export function logger(text, data = {}) {
  let items = getItem(STORAGE_KEY) || []
  let created_at = ('created_at' in data) ? data.created_at : new Date().toLocaleString()

  let item = {
    ...data,
    type: data.type || 'log',
    text: text || data.text, 
    created_at: created_at
  }

  if (!items || items.length <= 0){
    items = [item]
  }else {
    items.push(item)
  }

  setItem(STORAGE_KEY, items)
  return items
}

function onOverride(override) {
  const $_log = window.console.log;
  const $_info = window.console.info;
  const $_error = window.console.error;
  const $_warn = window.console.warn;

  const console = window.console;

  console.error = (message) => {
    $_error.apply(console, arguments);
    if (override){
      logger(message, { type: 'error'})
    }
  };
  
  console.log = (message) => {
    $_log.apply(console, arguments);
    if (override){
      logger(message, { type: 'log'})
    }
  };
  
  console.warn = (message) => {
    $_warn.apply(console, arguments)
    if (override){
      logger(message, { type: 'warn'})
    }
  }
  
  console.info = (message) => {
    $_info.apply(console, arguments)
    if (override){
      logger(message, { type: 'info'})
    }
  }
}

window.STORAGE_KEY = 'wc:logger'
