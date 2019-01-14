import './Alerts.scss';
import React from 'react';
import * as actions from './actions';
import { Link } from "react-router-dom";

class AlertComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  renderAlert() {
    const { alerts } = this.props;

    if (alerts.severity === 'error') {
      return(<div className="Alert">
      <div className="Alert__Body Alert__Body--danger">
        <h4>{ alerts.message }</h4>
      </div>
    </div>);
    } else if (alerts.severity === 'success') {
      return(<div className="Alert">
      <div className="Alert__Body Alert__Body--success">
        <h4>{ alerts.message }</h4>
      </div>
    </div>);
    } else if (alerts.severity === 'warning') {
      return(<div className="Alert">
      <div className="Alert__Body Alert__Body--warning">
        <h4>{ alerts.message }</h4>
      </div>
    </div>);
    } else if (alerts.severity === 'info') {
      return(<div className="Alert">
      <div className="Alert__Body Alert__Body--info">
        <h4>{ alerts.message }</h4>
      </div>
    </div>);
  } 
  }

  render() {
    const { alerts } = this.props;
    return(<span>
      { this.renderAlert() }
    </span>);
  }

}

export default AlertComponent;
