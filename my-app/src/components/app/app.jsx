import React, {Component} from 'react';
import TabsCard  from '../select-button/select-button';
import './App.less';
import 'antd/dist/antd.css';
import StoreClass from '../store-component/store';
import { Provider, observer } from 'mobx-react';
import { Form, Button } from 'antd';
import NavBar from '../nav-bar/nav-bar'


const store = new StoreClass();

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
  return (
    <Provider store={store}>
    <div className="App">
      <header className="App-header">
      WT2 Projekt
      <div className="navBar">
      {this.state.view != "login" ? <NavBar handleClick = {this.handleClick}/>:undefined}
      </div>
      </header>
        <div className="mainScreen">
            {this.state.view == "login" ? <TabsCard handleClick = {this.handleClick}/>: undefined}
            {this.state.view == "dashboard" ? <h1> dashboard </h1>: undefined}
        </div>
    </div>
    </Provider>
  );
}
}
export default App;


