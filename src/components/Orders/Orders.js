import React, {Component} from 'react';

import './Orders.css';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import Title from '../Title/Title';

class Orders extends Component {

  constructor(props){
   super(props);
   this.state = {
   name:'',
   redirect: false,
   products:[]
   };
  
   this.getOrders = this.getOrders.bind(this);
  }

  componentDidMount() {
    let data = JSON.parse(sessionStorage.getItem('userData'));
    console.log(data);
    this.getOrders(data.userData);
    this.setState({name: data.userData.name})
  }

  getOrders(userData){
   let postData = {uid: userData.uid, token:userData.token};
   console.log(postData);
   PostData('orders', postData).then((result) =>{
    let responseJson = result;
    this.setState({products: responseJson.products});
  

  });
  }
  


  render() {

    if(!sessionStorage.getItem('userData') || this.state.redirect){
      return (<Redirect to={'/'}/>)
    }

    return (
      <div className="row body" >
      <Title name={this.state.name}/>

      </div>
    );
  }
}

export default Orders;