import localforage from "localforage"
import { extendPrototype } from 'localforage-startswith'

extendPrototype(localforage);

localforage.config({
  driver : [localforage.INDEXEDDB, localforage.WEBSQL],
  name : 'loggerStorage',
  storeName: 'data'
})

window.STORAGE_KEY = 'loggerStorage'
window.$_forage = localforage

export default localforage
