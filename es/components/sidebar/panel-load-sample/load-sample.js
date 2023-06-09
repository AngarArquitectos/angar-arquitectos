import React, { Component } from "react";
import PropTypes from "prop-types";
import Test from "./cat.png";
import Panel from "../panel";
import { Tab, TabList, Tabs } from "react-tabs";
import { browserUpload } from "../../../utils/browser";
import sample from "../../../samples/sample1.json";

export default function LoadSample(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var handleClick = function handleClick(event) {
    event.preventDefault();
    projectActions.loadProject(sample);
  };

  var styles = {
    width: "200px",
    height: "auto"
  };

  var tabStyles = {
    border: "",
    margin: "10px"
  };

  return React.createElement(
    Panel,
    { name: "Cargar Diseños" },
    React.createElement(
      "table",
      { style: tabStyles },
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          React.createElement("img", { src: Test, style: styles, onClick: handleClick })
        )
      )
    )
  );
}

LoadSample.propTypes = {
  state: PropTypes.object.isRequired
};

LoadSample.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};