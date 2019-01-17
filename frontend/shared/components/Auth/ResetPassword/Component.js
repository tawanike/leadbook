import React from 'react';
import * as actions from '../actions';
import { Link } from "react-router-dom";
import * as alerts from '../../Alerts/actions';
import AuthService from '../../../services/auth';

const authService = new AuthService();

class ResetPasswordComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: ""}

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
    const { dispatch, history } = this.props;

    authService.resetPassword(this.state)
    .then(response => {
      if(response.status === 200){
        dispatch(alerts.toggle('Password reset initiated successfully.', 'success'));
        history.push('/accounts/login');
      }
    })
    .catch(error => {
      console.log(error)
      dispatch(alerts.toggle('An error occured trying to initiate password reset.', 'error'));
    });
  }

  render() {
    return(<div className="Auth">
      <div className="Auth__SignUp">
        <h3>Reset Password</h3>
        <form onSubmit={ this.handleSubmit}>
        <div className="form-group">
          <input type="text" onChange={this.handleChange} value={this.state.password}
            name="email" placeholder="Email Address" className="form-control" />
        </div>
        <div className="form-group">
          <button className="btn btn-block Button--primary">Reset Password</button>
        </div>
      </form>
      </div>
    </div>);
  }
}

export default ResetPasswordComponent;
