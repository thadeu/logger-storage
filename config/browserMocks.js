const localStorageMock = (function() {
  let store = {}
  return {
    getItem: function(key) {
      let items = store[key] ? JSON.parse(store[key]) : null

      if (!items) {
        return
      }

      return JSON.parse(store[key])
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    removeItem: function(key) {
      delete store[key]
    },
    clear: function() {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

global.STORAGE_KEY = 'logger:storage'
