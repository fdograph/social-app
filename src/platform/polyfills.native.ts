// import {generateSecureRandom} from 'react-native-securerandom'
import {NativeModules} from 'react-native'
const {AppSecureRandomModule} = NativeModules
import {toByteArray} from 'base64-js'
import crypto from 'msrcrypto'
import '@zxing/text-encoding' // TextEncoder / TextDecoder

async function generateSecureRandom(bytes: number) {
  console.log('a')
  return toByteArray(
    await AppSecureRandomModule.generateSecureRandomAsBase64(bytes),
  )
}

export const whenWebCrypto = new Promise(async (resolve, reject) => {
  try {
    const bytes = await generateSecureRandom(48)
    crypto.initPrng(Array.from(bytes))

    // @ts-ignore global.window exists -prf
    if (!global.window.crypto) {
      // @ts-ignore global.window exists -prf
      global.window.crypto = crypto
    }
    resolve(true)
  } catch (e: any) {
    reject(e)
  }
})

export const webcrypto = crypto
