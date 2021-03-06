import { BN } from 'web3-utils'
import { NUMBER } from './fieldTypes'

export default class Uint {
  constructor (abiType) {
    // skip the "int" part at the start
    let M = abiType.substr(4)
    if (!M.length) {
      M = '256'
    }
    this.maxInt = new BN(2, 10).pow(new BN(M, 10))
    this.minInt = new BN(0, 10)
  }
  fieldType = () => NUMBER
  placeholderText = () => `123...`
  isValid = val => {
    if (Number.isNaN(parseInt(`${val}`, 10))) {
      return false
    }

    try {
      const bv = new BN(`${val}`, 10)
      return bv.gte(this.minInt) && bv.lte(this.maxInt)
    } catch (_) {
      return false
    }
  }
  sanitize = v => (v || '').trim()
}
