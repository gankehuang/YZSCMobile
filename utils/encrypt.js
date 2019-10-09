import CryptoJS from './crypto-js.min.js'

export default function encrypt(msg, key) {
  key = key || ''
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const encrypted = CryptoJS.AES.encrypt(msg, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
