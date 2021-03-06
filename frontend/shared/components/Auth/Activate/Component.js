import React from 'react';
import * as actions from '../actions';
import * as alertActions from '../../Alerts/actions';
import { Link } from "react-router-dom";

import AuthService from '../../../services/auth';
const authService = new AuthService();

class ActivateComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    authService.activate(match.params.code)
    .then(response => {
      dispatch(actions.accountActivated(true));
    })
    .catch(error => {
      dispatch(actions.accountActivated(false));
    });
  }

  renderActivationStatus() {
    const { auth, dispatch } = this.props;
    if (auth.error) {
      return(<div>
        <h4>Account not activated, the activation code is incorrect.</h4>

      </div>);
    } else {
      return(<div>
        <h4>Account has been activated successfully.</h4>
        <p><Link to="/accounts/login">Log In</Link></p>

      </div>);
    }
  }

  render() {

    return(<div className="Auth">
    <h3>Activate Account</h3>
     { this.renderActivationStatus() }
    </div>);
  }

}

export default ActivateComponent;
