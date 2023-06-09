import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import * as SharedStyle from "../../../shared-style";
import MailModal from "./mail-modal";
import { Project } from "../../../class/export";
import { sendEmail } from "../../../utils/mail";

const STYLE = {
  color: SharedStyle.PRIMARY_COLOR,
  borderTop: "",
  borderBottom: "",
  userSelect: "none",
};
const STYLE_TITLE = {
  fontSize: "20px",
  color: SharedStyle.COLORS.white,
  padding: "5px 15px 8px 15px",
  backgroundColor: SharedStyle.COLORS.black,
  textShadow: "",
  boxShadow: "",
  margin: "10px",
  cursor: "pointer",
  textAlign: "center",
};

export default class PanelFinalizar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.saveProjectToFile = this.saveProjectToFile.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  saveProjectToFile(data) {
    const { state } = this.props;
    const updatedState = Project.unselectAll(state).updatedState;
    sendEmail(data, updatedState.get("scene").toJS());
    this.closeModal();
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { isModalOpen } = this.state;

    return (
      <Fragment>
        <div style={STYLE}>
          <h3
            style={{
              ...STYLE_TITLE,
            }}
            onClick={this.openModal}
          >
            Finalizar y enviar
          </h3>
        </div>
        <MailModal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          saveProject={this.saveProjectToFile}
        />
      </Fragment>
    );
  }
}

PanelFinalizar.propTypes = {
  state: PropTypes.object.isRequired,
};
