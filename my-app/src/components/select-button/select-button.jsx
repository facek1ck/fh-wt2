import React from 'react';
import { Button } from 'antd';
import './select-button.less';


const ButtonGroup = Button.Group;

const SelectButton = () => {
  return(
  <div className="custom-button-group">
  <ButtonGroup>
  <Button type="danger" className="left-select-btn">
    <h4>Offline</h4> 
    Lokalen Test laden
  </Button>
  <Button type="danger" className="right-select-btn">
    <h4>Online</h4>
    Test online durchführen.
  </Button>
  </ButtonGroup>
  </div>
  )
}

export default SelectButton;