import { isDate, isObject } from "../helpers/utils"

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts = []
  //params{name:[123,123]}
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === "undefined") {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
        //toISOString() 方法可以使用ISO标准将 Date 对象转换为字符串。
      }
      if (isObject(val)) {
        val = JSON.stringify(val)
      }
    })
    parts.push(`${key}=${val}`)

  })


  return ""

}