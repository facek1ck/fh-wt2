import React from 'react';
import TabsCard  from '../select-button/select-button';
import './App.less';
import 'antd/dist/antd.css';
import CollectionsPage from '../identification-modal/identification-modal';


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
      Webtechnologien 2 Projekt
      </header>
        <div className="mainScreen">
          <div className="selectMode">
            <TabsCard />
         </div>
         <div className="modalButton">
         </div>
         <CollectionsPage />
        </div>
    </div>
  );
}

export default App;
