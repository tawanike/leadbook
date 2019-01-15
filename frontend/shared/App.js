import './App.scss';
import React from 'react';
import routes from './routes';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './components/Partials/Header';
import Alerts from './components/Alerts/Container';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="Wrapper">
      <Header />
      <Alerts />
      <div>
        {routes.map((route, i) => <Route key={i} {...route} />)}
      </div>
    </div>);
  }
}

export default App;
