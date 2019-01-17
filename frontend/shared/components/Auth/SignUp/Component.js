import '../Style.scss';
import React from 'react';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

import AuthService from '../../../services/auth';
const authService = new AuthService();


class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      emailAvailable: true,
      usernameAvailable: true
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

    if (name === 'username') {
      if(value.length >= 4) {
        authService.checkAvailability(name, value)
        .then(response => {
          this.setState({ usernameAvailable: response.data.is_available });
        });
      }else{
        this.setState({ usernameAvailable: false });
      }

    } else if (name === 'email') {
      authService.checkAvailability(name, value)
      .then(response => {
        this.setState({ emailAvailable: response.data.is_available });
      });
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    const { dispatch, history } = this.props;
    authService.create('users/', this.state)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    });
  }

  render() {
    return(<div className="Auth">
      <div className="Auth__SignUp">
        <h3>Sign Up</h3>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input type="text" name="first_name" placeholder="First Name" className="form-control"
              value={this.state.first_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input type="text" name="last_name" placeholder="Last Name" className="form-control"
              value={this.state.last_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input type="text" name="username" placeholder="Username"
              className={ !this.state.usernameAvailable ? (
                'form-control Feedback__Input--error'
              ):(
                "form-control Feedback__Input"
              )}
              value={this.state.username}
              onChange={this.handleChange}
            />

          { this.state.username.length < 4 ? (
            <span className="Feedback Feedback__Text--error">Username is too short, minimun 4 characters.</span>
          ): ''}
          { this.state.usernameAvailable ? (
            ''
          ):(
            <span className="Feedback Feedback__Text--error">Username is already taken.</span>
          )}
          </div>
          <div className="form-group">
            <input type="text" name="email" placeholder="Email Address" className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
            />
          { this.state.emailAvailable ? (
              ''
            ):(
              <span className="Feedback Feedback__Text--error">Email is already in use.</span>
            )}
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Password" className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block Button">Sign Up</button>
          </div>
        </form>
      </div>
    </div>);
  }

}

export default SignUpComponent;
