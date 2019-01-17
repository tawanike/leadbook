import React from 'react';
import * as actions from '../actions';

class SignOutComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, history } = this.props;
    window.localStorage.removeItem('token');
    dispatch(actions.signOut());
    history.push('/');
  }
  render() {
    return(<div className="">Sign Out</div>);
  }

}

export default SignOutComponent;
