export { clear } from './storage'

import { setItem, getItem, clear } from './storage'
export { all, filter, logs, errors, warns, infos } from './filters'

export function sync(options) {
  options = options || {};

  const isStorage = ('isStorage' in options) ? options.isStorage : true;
  const reloadClear = ('reloadClear' in options) ? options.reloadClear : true;

  if (reloadClear) {
    clear()
  }
  
  onStorage(isStorage)
  
  return {
    isStorage: () => isStorage,
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

function onStorage(isStorage) {
  const $_log = window.console.log;
  const $_info = window.console.info;
  const $_error = window.console.error;
  const $_warn = window.console.warn;

  const console = window.console;

  console.error = (message) => {
    $_error(message);
    
    if (isStorage){
      logger(message, { type: 'error'})
    }

    return message
  };
  
  console.log = (message) => {
    $_log(message);
    
    if (isStorage){
      logger(message, { type: 'log'})
    }

    return message
  };
  
  console.warn = (message) => {
    $_warn(message)
    
    if (isStorage){
      logger(message, { type: 'warn'})
    }

    return message
  }
  
  console.info = (message) => {
    $_info(message)
    
    if (isStorage){
      logger(message, { type: 'info'})
    }

    return message
  }
}

window.STORAGE_KEY = 'logger:storage'
