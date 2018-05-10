export { clear } from './storage'

import { setItem, getItem, clear } from './storage'
export { all, filter, logs, errors, warns, infos } from './filters'

export function sync(options) {
  options = options || {};

  const auto_start = ('auto_start' in options) ? options.auto_start : true
  const reloadClear = ('reloadClear' in options) ? options.reloadClear : true
  const watchOnly = ('only' in options) ? options.only : ['error', 'log', 'info', 'warn', 'debug']

  if (reloadClear) {
    clear()
  }
  
  onStorage(auto_start, watchOnly)
  
  return {
    autoStarted: () => auto_start,
    reloadClear: () => reloadClear
  }
}

function onStorage(auto_start, watchOnly) {
  const $_log = window.console.log;
  const $_info = window.console.info;
  const $_error = window.console.error;
  const $_warn = window.console.warn;

  const console = window.console;

  console.error = (message) => {
    $_error(message);
    
    if (auto_start && watchOnly.includes('error')){
      logger(message, { type: 'error'})
    }

    return message
  };
  
  console.log = (message) => {
    $_log(message);
    
    if (auto_start && watchOnly.includes('log')){
      logger(message, { type: 'log'})
    }

    return message
  };
  
  console.warn = (message) => {
    $_warn(message)
    
    if (auto_start && watchOnly.includes('warn')){
      logger(message, { type: 'warn'})
    }

    return message
  }
  
  console.info = (message) => {
    $_info(message)
    
    if (auto_start && watchOnly.includes('info')){
      logger(message, { type: 'info'})
    }

    return message
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

window.STORAGE_KEY = 'logger:storage'
