import React, {Component} from 'react';
import TabsCard  from '../select-button/select-button';
import './App.less';
import 'antd/dist/antd.css';
import StoreClass from '../store-component/store';
import { Provider } from 'mobx-react';

const store = new StoreClass();


class App extends Component {
  render(){
  return (
    <Provider store={store}>
    <div className="App">
      <header className="App-header">
      WT2 Projekt
      </header>
        <div className="mainScreen">
          <div className="selectMode">
            <TabsCard />
         </div>
        </div>
    </div>
    </Provider>
  );
}
}
export default App;
