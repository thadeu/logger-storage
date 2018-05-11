import { setItem, getItem } from '../storage'

export function all(key = STORAGE_KEY) {
  return new Promise((resolve, reject) => {
    try{
      let items = getItem(key)

      if (items) {
        return resolve(getItem(key))
      }

      return resolve({ error: true, message: 'Undefined record in localStorage' })
    } catch (e) {
      reject(new Error(`Error when find ${key}`))
    }
  })
}

export async function filter(type) {
  let alls = await all(STORAGE_KEY)
  
  try {
    let items = alls.filter(item => item.type_event == type) 
    return Promise.resolve(items)
  } catch (error) {
    return new Error(`We dont able to get logs: ${error}`)
  }
}

export function logs() {
  return filter('log')
}

export function errors() {
  return filter('error')
}

export function warns() {
  return filter('warn')
}

export function infos() {
  return filter('info')
}
