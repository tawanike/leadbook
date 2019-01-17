import React from "react";
import { connect } from "react-redux";
import Component from "./Component";

const mapStateToProps = state => {
  return {
    auth: state.auth,
    search: state.search,
    user: state.user,
    favourites: state.favourites
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
