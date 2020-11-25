import * as home from './action-type';

let defaultState = {
  orderSum: '', //amount
  name: '', //name
  phoneNo: '', //phone number
  imgpath: '', //image address
}
// home page form data
export const formData = (state = defaultState , action = {}) => {
  switch(action.type){
    case home.SAVEFORMDATA:
      return {...state, ...{[action.datatype]: action.value}};
    case home.SAVEIMG:
      return {...state, ...{imgpath: action.path}};
    case home.CLEARDATA:
      return {...state, ...defaultState};
    default:
      return state;
  }
}

