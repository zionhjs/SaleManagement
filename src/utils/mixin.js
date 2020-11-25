export default methods => {
  return target => {
    Object.assign(target.prototype, methods);
  }
}

/**
 * string filling func
 * @param  {string} value      target string
 * @param  {array} position where to fill
 * @param  {string} padstr   filling string
 * @return {string}          return target string
 */
export const padStr = (value, position, padstr, inputElement) => {
  position.forEach((item, index) => {
    if (value.length > item + index) {
      value = value.substring(0, item + index) + padstr + value.substring(item + index)
    }
  })
  value = value.trim();
  // solve android problem
  requestAnimationFrame(() => {
    inputElement.setSelectionRange(value.length, value.length); 
  })
  return value;
}

