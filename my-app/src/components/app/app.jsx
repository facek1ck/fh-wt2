import React, {Component} from 'react';
import SelectButton  from '../select-button/select-button';
import { inject, observer } from 'mobx-react';
import './App.less';
import 'antd/dist/antd.css';
import StoreClass from '../store-component/store';
<<<<<<< HEAD
import { Provider, observer } from 'mobx-react';
import { Form, Button } from 'antd';


const store = new StoreClass();

=======
import { Provider } from 'mobx-react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import TestList from '../test-list/test-list';
import Navigation from '../navigation/navigation';

@inject('routing')
>>>>>>> test-list
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {view: store.viewState};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(value){
    this.setState(state => ({
      view: value
    }))
  }

  render(){
    const { location, push, goBack } = this.props.routing;
  return (
    <div className="App">
      <header className="App-header">
      WT2 Projekt
      </header>
        <div className="mainScreen">
          <div className="selectMode">
            {this.state.view == "login" ? <TabsCard handleClick = {this.handleClick}/>: undefined}
            {this.state.view == "dashboard" ? <h1> dashboard </h1>: undefined}
         </div>
        </div>
    </div>
  );
}
}
export default App;


