export function all() {
  return new Promise((resolve, reject) => {
    try{
      resolve($_forage.startsWith('loggerStorage'))
    } catch (e) {
      reject(new Error(`Error : ${e}`))
    }
  })
}

export async function filter(type) {
  let alls = await all()
  
  try {
    let items = Object.values(alls).filter(item => item.type_event == type) 
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
