import { Icon, Input, Radio, Button } from 'antd';
import React from "react";
import './auth-form.less';


const AuthForm = () => {

  return(
  <div> 
  <div className="custom-button-group">
    <Radio.Group defaultValue="a" buttonStyle="solid">
    <Radio.Button value="a" className="left-select-btn">
      
        Lokalen Test laden
    </Radio.Button>
    <Radio.Button value="b" className="right-select-btn">
       
        Test online durchführen.
    </Radio.Button>
    </Radio.Group>
  </div>
  <div className="input-group">
      <Input
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Username"
        />
      <Input
        prefix={<Icon type="eye" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="User ID"
        />
  </div>
      <div className="submit-button">
        <Button size="large" type="primary">
            Weiter
        </Button>
      </div>
  </div> 
  )
}

export default AuthForm;