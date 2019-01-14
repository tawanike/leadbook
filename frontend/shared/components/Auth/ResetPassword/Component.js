import React from 'react';
import * as actions from '../actions';
import { Link } from "react-router-dom";

class ResetPasswordComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(<div className="Auth">
      <div className="Auth__SignUp">
        <h3>Reset Password</h3>
        <div className="form-group">
          <input type="text" name="email" placeholder="Email Address" className="form-control" />
        </div>
        <div className="form-group">
          <button className="btn btn-block Button--primary">Reset Password</button>
        </div>
      </div>
    </div>);
  }
}

export default ResetPasswordComponent;
