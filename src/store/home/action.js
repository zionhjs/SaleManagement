import * as home from './action-type';

// save form data
export const saveFormData = (value, datatype) => {
  return {
    type: home.SAVEFORMDATA,
    value,
    datatype,
  }
}

// save image address
export const saveImg = path => {
  return {
    type: home.SAVEIMG,
    path,
  }
}

// save image address
export const clearData = () => {
  return {
    type: home.CLEARDATA,
  }
}

