export function setItem(key, entries){
  return localStorage.setItem(key, JSON.stringify(entries))
}

export function getItem(key){
  let items = localStorage.getItem(key) ? localStorage.getItem(key) : null
  if (!items) { return false }
  return (typeof items === 'object') ? items : JSON.parse(items)
}

export function clear() {
  return localStorage.removeItem(STORAGE_KEY)
}
