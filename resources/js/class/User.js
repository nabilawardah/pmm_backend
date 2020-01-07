import { isEqual, transform, isObject } from 'lodash'
import validator from 'validator'

function difference(object, base) {
  function changes(object, base) {
    return transform(object, function(result, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value
      }
    })
  }
  return changes(object, base)
}

export default class User {
  constructor(props) {
    this.data = { ...props }
  }

  get = () => this.data

  set = data => {
    this.data = Object.assign({}, { ...this.data, ...data })
    return this.data
  }

  setInitial = incomingData => {
    this.initialData = { ...incomingData }
    // console.log('INITIAL: ', this.initialData)
    return this.initialData
  }

  isChanged = () => {
    // console.log('INIT: ', this.initialData)
    // console.log(this.data)
    return Object.keys(difference(this.initialData, this.data)).length
  }

  isValidEmail = () => {
    return validator.isEmail(this.data.email)
  }
}
