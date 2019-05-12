import React from 'react';
import { Button } from 'antd';
import './select-button.less';


const ButtonGroup = Button.Group;

const SelectButton = () => {
  return(
  <div className="custom-button-group">
  <ButtonGroup>
  <Button type="ghost" className="left-select-btn">Offline</Button>
  <Button className="right-select-btn">Online</Button>
  </ButtonGroup>
  </div>
  )
}

export default SelectButton;