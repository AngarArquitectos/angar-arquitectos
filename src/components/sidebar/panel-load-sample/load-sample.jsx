import React, { Component } from "react";
import PropTypes from "prop-types";
import Test from "./cat.png";
import Panel from "../panel";
import { Tab, TabList, Tabs } from "react-tabs";
import { browserUpload } from "../../../utils/browser";
import sample from "../../../samples/sample1.json";

export default function LoadSample({ state }, { translator, projectActions }) {
  
  let handleClick = event => {
    event.preventDefault();
    projectActions.loadProject(sample);
  };

  const styles = {
    width: "200px",
    height: "auto",
  };

  const tabStyles = {
    border: "",
    margin:"10px"
  };

  return (
    <Panel name={"Cargar Diseños"}>
      <table style={tabStyles}>
        <tr>
          <td>
            <img src={Test} style={styles} onClick={handleClick}></img>
          </td>
        </tr>
      </table>
    </Panel>
  );
}

LoadSample.propTypes = {
  state: PropTypes.object.isRequired,
};

LoadSample.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
