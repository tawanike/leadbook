import React from "react";
import { connect } from "react-redux";
import Component from "./Component";

const mapStateToProps = state => {
  return {
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
)(Component);
