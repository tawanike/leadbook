import React from 'react';
import * as actions from '../actions';
import { Link } from "react-router-dom";
import * as alerts from '../../Alerts/actions';
import AuthService from '../../../services/auth';

const authService = new AuthService();

class CreatePasswordComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirm_password: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    const { dispatch, history, match } = this.props;

    authService.createPassword(match.params.code, this.state)
    .then(response => {
      if(response.status === 200){
        dispatch(alerts.toggle('New password has been set.', 'success'));
        history.push('/accounts/login')
      }
    })
    .catch(error => {
      console.log(error)
      dispatch(alerts.toggle('An error occured trying to create a new password', 'danger'));
    });
  }

  render() {
    return(<div className="Auth">
      <div className="Auth__SignUp">
        <h3>Create Password</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="password"  onChange={this.handleChange} value={this.state.password}
              name="password" placeholder="New Password"
              className="form-control" autoComplete="off" />
          </div>
          <div className="form-group">
            <input type="password"  onChange={this.handleChange}  value={this.state.confirm_password}
              name="confirm_password" placeholder="Confirm Password" className="form-control" />
          </div>
          <div className="form-group">
            <button className="btn btn-block Button--primary">Create Password</button>
          </div>
        </form>
      </div>
    </div>);
  }

}

export default CreatePasswordComponent;
