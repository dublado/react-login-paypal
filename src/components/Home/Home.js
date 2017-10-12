import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import './Home.css';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import Title from '../Title/Title';
import ProductsList from '../ProductsList/ProductsList';
class Home extends Component {

  constructor(props){
   super(props);
   this.state = {
   name:'',
   redirect: false,
   products:[]
   };
  
   this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    let data = JSON.parse(sessionStorage.getItem('userData'));
    console.log(data);
    this.getProducts(data.userData);
    this.setState({name: data.userData.name})
  }

  getProducts(userData){
   let postData = {uid: userData.uid, token:userData.token};
   console.log(postData);
   PostData('products', postData).then((result) =>{
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
      <ProductsList productsData={this.state.products} />
      </div>
    );
  }
}

export default Home;