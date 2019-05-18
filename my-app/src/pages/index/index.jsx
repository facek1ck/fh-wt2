import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from '../../components/app/app';
import store from '../../components/store-component/store';

ReactDOM.render(<App store={store}/>, document.getElementById('root'));


