import React from 'react';
import * as actions from '../actions';
import * as alerts from '../../Alerts/actions';
import { Link } from "react-router-dom";
const jwtDecode = require('jwt-decode');

import AuthService from '../../../services/auth';
const authService = new AuthService();

class SignInComponent extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        username: "",
        password: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
      const { auth, history } = this.props;
      
      if(auth.isLoggedIn){
        history.push('/search');
      }
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

      authService.authorise(this.state)
      .then(response => {
        if(response.status === 200){
          const token = response.data.token;
          window.localStorage.setItem('token', token);
          dispatch(actions.signIn(true));
          const decoded = jwtDecode(token);
          dispatch(actions.getUser(decoded));
          dispatch(alerts.toggle('Sign In successful.', 'success'));
          history.push('/search');
        }
      })
      .catch(error => {
        console.log(error)
      });
    }

  render() {
    return(<div className="Auth">
      <div className="Auth__SignUp">
        <h3>Log In</h3>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input type="text" name="username" placeholder="Username" className="form-control"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Password" className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <p>Don't have an account? <Link to="/accounts/signup">Sign Up</Link></p>
            <p><Link to="/accounts/reset-password">Forgot Password</Link></p>
          </div>
          <div className="form-group">
            <button className="btn btn-block Button">Log In</button>
          </div>
        </form>
      </div>
    </div>);
  }

}

export default SignInComponent;
