import * as pro from './action-type';
import API from '@/api/api';

// initialize product data from redux
export const getProData = () => {
  // return func, async dispatch
  return async dispatch => {
    try{
      let result = await API.getProduction();
      result.map(item => {
        item.selectStatus = true;
        item.selectNum = 0;
        return item;
      })
      dispatch({
        type: pro.GETPRODUCTION,
        dataList: result,
      })
    }catch(err){
      console.error(err);
    }
  }
}

// choose product
export const togSelectPro = index => {
  return {
    type: pro.TOGGLESELECT,
    index,
  }
}

// edit product
export const editPro = (index, selectNum) => {
  return {
    type: pro.EDITPRODUCTION,
    index,
    selectNum,
  }
}

// close choose
export const clearSelected = () => {
  return {
    type: pro.CLEARSELECTED,
  }
}



