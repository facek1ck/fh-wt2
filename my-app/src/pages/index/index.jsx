import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from '../../components/app/app';
import store from '../../components/store-component/store';
import axios from 'axios';



window.addEventListener('beforeunload', (event) => {
    console.log("POST");
    var headers = {
        'Content-Type': 'application/json'
      }
      axios.post('http://gabriels-macbook.local:3000/requests/heartbeat',{
        lastName: this.props.store.user.lastName,
        online: false
      },{headers:headers})
      .then((response)=>{
        console.log(response);
      })
      .catch(function(error){
        console.log(error)
      });
  });



  ReactDOM.render(
    <App store={store}/>,  document.getElementById('root'));
  


