import React, {Component} from 'react';
import { Button } from 'antd';
import './select-button.less';
import OfflineLogIn from '../identification-modal-offline/identification-modal-offline';
import OnlinelineLogIn from '../identification-modal-online/identification-modal-online';
import OnlineLogIn from '../identification-modal-online/identification-modal-online';



const ButtonGroup = Button.Group;


class SelectButton extends Component {
  render(){
  return(
  <div className="custom-button-group">
  <ButtonGroup>
  <OfflineLogIn handleClick = {this.props.handleClick}/>
  <OnlineLogIn handleClick = {this.props.handleClick}/>
  </ButtonGroup>
  </div>
  );
}
}

export default SelectButton;