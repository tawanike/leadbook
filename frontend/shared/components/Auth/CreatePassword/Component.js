import React from 'react';
import * as actions from '../actions';
import { Link } from "react-router-dom";

class CreatePasswordComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(<div className="Auth">
      <div className="Auth__SignUp">
        <h3>Create Password</h3>
        <div className="form-group">
          <input type="password" name="password" placeholder="New Password"
            className="form-control" autocomplete="off" />
        </div>
        <div className="form-group">
          <input type="password" name="confirm_password" placeholder="Confirm Password" className="form-control" />
        </div>
        <div className="form-group">
          <button className="btn btn-block Button--primary">Create Password</button>
        </div>
      </div>
    </div>);
  }

}

export default CreatePasswordComponent;
