


export function isDate(val: any): val is Date {
  return Object.prototype.toString.call(val) === '[object Date]'
}


export function isObject(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object Object]'
}