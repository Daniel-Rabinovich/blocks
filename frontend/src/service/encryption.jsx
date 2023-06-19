import AES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'


export const encrypt = (text, password) => {
    return AES.encrypt(text, password).toString()
}


export const decrypt = (text, password) => {
    const bytes = AES.decrypt(text, password)
    return bytes.toString(CryptoJS.enc.Utf8)
}
