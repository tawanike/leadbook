import React from 'react';
import routes from './routes';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import {   Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, Row, Col, Container } from 'reactstrap';

class App extends React.Component {
  constructor(props) {
  super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (<div className="Wrapper">
    <div className="Navigation">
    <div className="container">
        <div className="Navigation__Logo"><Link to="/">LawyerApp</Link></div>
        <div className="Navigation__Menu">
          <ul>
            <li><Link  className="Navigation__Button Navigation__Button--primary"
              to="/search">Search</Link></li>
              <li><Link  className="Navigation__Button Navigation__Button--primary"
                to="/accounts/signup">Sign Up</Link></li>
              <li><Link className="Navigation__Button Navigation__Button--outline"
                to="/accounts/login">Sign In</Link></li>
            <li><Link className="Navigation__Button Navigation__Button--outline"
              to="/accounts/logout">Sign Out</Link></li>
              <li><Link  className="Navigation__Button Navigation__Button--primary"
                to="/dashboard">Reset Password</Link></li>
              <li><Link className="Navigation__Button Navigation__Button--outline"
                to="/accounts/signout"></Link></li>
          </ul>
        </div>
      </div>
      </div>
    {routes.map((route, i) => <Route key={i} {...route} />)}
    </div>);
  }
}

export default App;
