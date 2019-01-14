import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<nav className="navbar navbar-expand-lg Navigation">
      <div className="container">
        <Link className="navbar-brand" to="/">Leadbook</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/accounts/signup">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/accounts/login">Log In</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>);
  }
}

export default HeaderComponent;
