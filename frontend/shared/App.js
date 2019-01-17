import './App.scss';
import React from 'react';
import routes from './routes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './components/Partials/Header';
import Alerts from './components/Alerts/Container';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'APPLICATION_MOUNTED' });
  }

  render() {
    return (<div className="Wrapper">
      <Header { ...this.props } />
      <Alerts />
      <div>
        {routes.map((route, i) => <Route key={i} {...route} />)}
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    router: state.router
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
