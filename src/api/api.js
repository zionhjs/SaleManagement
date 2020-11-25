import Server from './server';

class API extends Server{
  /**
   *  for：uploading image
   *  @url https://elm.cangdu.org/v1/addimg/shop
   *  return status 1 means success
   *  @method post
   *  @return {promise}
   */
  async uploadImg(params = {}){
    try{
      let result = await this.axios('post', '//elm.cangdu.org/v1/addimg/shop', params); 
      if(result && result.status === 1){
        return result;
      }else{
        let err = {
          tip: 'uploading image failed',
          response: result,
          data: params,
          url: '//elm.cangdu.org/v1/addimg/shop',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   *  for ：get history data
   *  @url https://api.cangdu.org/shopro/data/record
   *  return http_code为200 means success
   *  @method get
   *  @return {promise}
   */
  async getRecord(params = {}){
    try{
      let result = await this.axios('get', `/shopro/data/record/${params.type}`); 
      if(result && (result.data instanceof Object) && result.http_code === 200){
        return result.data;
      }else{
        let err = {
          tip: 'get history data failed',
          response: result,
          data: params,
          url: 'https://api.cangdu.org/shopro/data/record',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   *  for: get product data
   *  @url https://api.cangdu.org/shopro/data/products
   *  return http_code 200 means success
   *  @method get
   *  @return {promise}
   */
  async getProduction(params = {}){
    try{
      let result = await this.axios('get', '/shopro/data/products', params); 
      if(result && (result.data instanceof Object) && result.http_code === 200){
        return result.data.data||[];
      }else{
        let err = {
          tip: 'load product data failed',
          response: result,
          data: params,
          url: 'https://api.cangdu.org/shopro/data/products',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   *  for: get commision data
   *  @url https://api.cangdu.org/shopro/data/balance
   *  return http_code 200 means success
   *  @method get
   *  @return {promise}
   */
  async getBalance(params = {}){
    try{
      let result = await this.axios('get', '/shopro/data/balance', params); 
      if(result && (result.data instanceof Object) && result.http_code === 200){
        return result.data.data||{};
      }else{
        let err = {
          tip: 'get commission data failed',
          response: result,
          data: params,
          url: 'https://api.cangdu.org/shopro/data/balance',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
}

export default new API();