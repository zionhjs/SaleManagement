import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import PropTypes from 'prop-types';
import API from '@/api/api';
import envconfig from '@/envconfig/envconfig';
import { saveFormData, saveImg, clearData } from '@/store/home/action';
import { clearSelected } from '@/store/production/action';
import PublicHeader from '@/components/header/header';
import PublicAlert from '@/components/alert/alert';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import mixin, { padStr } from '@/utils/mixin';
import './home.less';

@mixin({padStr})
class Home extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    saveFormData: PropTypes.func.isRequired,
    saveImg: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    clearSelected: PropTypes.func.isRequired,
  }

  state = {
    alertStatus: false, //pop window stats
    alertTip: '', //helper text
  }
  /**
   * selected product data
   * @type {Array}
   */
  selectedProList = []; 

  /**
   * save data to redux
   * @param  {string} type  data format orderSum||name||phoneNo
   * @param  {object} event eventObj
   */
  handleInput = (type, event) => {
    let value = event.target.value;
    switch(type){
      case 'orderSum':
        value = value.replace(/\D/g, '');
      break;
      case 'name':
      break;
      case 'phoneNo':
        value = this.padStr(value.replace(/\D/g, ''), [3, 7], ' ', event.target);
      break;
      default:;
    }
    this.props.saveFormData(value, type);
  }
  
  /*
  upload image and save image to redux
   */
  uploadImg = async event => {
    try{
      let formdata = new FormData();
      formdata.append('file', event.target.files[0]);
      let result = await API.uploadImg({data: formdata});
      this.props.saveImg(envconfig.imgUrl + result.image_path);
      console.log(result);
    }catch(err){
      console.error(err);
    }
  }

  // submit form
  sumitForm = () => {
    const {orderSum, name, phoneNo} = this.props.formData;
    let alertTip = '';
    if(!orderSum.toString().length){
      alertTip = 'please type in amount';
    }else if(!name.toString().length){
      alertTip = 'please type in name';
    }else if(!phoneNo.toString().length){
      alertTip = 'please type in phone number';
    }else{
      alertTip = 'add data success';
      this.props.clearSelected();
      this.props.clearData();
    }
    this.setState({
      alertStatus: true,
      alertTip,
    })
  }
  
  // close window
  closeAlert = () => {
    this.setState({
      alertStatus: false,
      alertTip: '',
    })
  }
  
  // initialize data
  initData = props => {
    this.selectedProList = [];
    props.proData.dataList.forEach(item => {
      if(item.selectStatus && item.selectNum){
        this.selectedProList.push(item);
      }
    })
  }

  componentWillReceiveProps(nextProps){
    if(!is(fromJS(this.props.proData), fromJS(nextProps.proData))){
      this.initData(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }

  componentWillMount(){
    this.initData(this.props);
  }
  

  render() {
    
    return (
      <main className="home-container">
        <PublicHeader title='Home' record />
        <p className="common-title">请录入您的信息</p>
        <form className="home-form">
          <div className="home-form-tiem">
            <span>Sales amount: </span>
            <input type="text" placeholder="please type in order amount" value={this.props.formData.orderSum} onChange={this.handleInput.bind(this, 'orderSum')}/>
          </div>
          <div className="home-form-tiem">
            <span>Client name: </span>
            <input type="text" placeholder="please type in client name" value={this.props.formData.name} onChange={this.handleInput.bind(this, 'name')}/>
          </div>
          <div className="home-form-tiem">
            <span>Client number: </span>
            <input type="text" maxLength="13" placeholder="please type in client phone number" value={this.props.formData.phoneNo} onChange={this.handleInput.bind(this, 'phoneNo')}/>
          </div>
        </form>
        <div>
          <p className="common-title">Please select sales product: </p>
          <Link to="/production" className="common-select-btn">
            {
              this.selectedProList.length ? <ul className="selected-pro-list">
                {
                  this.selectedProList.map((item, index) => {
                    return <li key={index} className="selected-pro-item ellipsis">{item.product_name}x{item.selectNum}</li>
                  })
                }
              </ul>:'please choose product'
            }
          </Link>
        </div>
        <div className="upload-img-con">
          <p className="common-title">please upload credential: </p>
          <div className="file-lable">
            <span className="common-select-btn">upload image</span>
            <input type="file" onChange={this.uploadImg}/>
          </div>
          <img src={this.props.formData.imgpath} className="select-img" alt=""/>
        </div>
        <TouchableOpacity className="submit-btn" clickCallBack={this.sumitForm} text="submit" />
        <PublicAlert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} />
      </main>
    );
  }
}

export default connect(state => ({
  formData: state.formData,
  proData: state.proData,
}), {
  saveFormData, 
  saveImg,
  clearData,
  clearSelected,
})(Home);
