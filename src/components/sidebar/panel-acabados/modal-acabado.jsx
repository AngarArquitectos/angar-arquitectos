import React, { Component } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import * as SharedStyle from "../../../shared-style";
import "bootstrap/dist/css/bootstrap.css";

export default class ModalAcabado extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isOpen, onRequestClose } = this.props;

    if (!isOpen) {
      return null;
    }

    const modalStyles = {
      content: {
        width: "80%",
        height: "80%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    };

    return (
      <div>
        <ReactModal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          style={modalStyles}
          contentLabel="ModalAcabados"
        >
          <img src={this.props.imagen} />
        </ReactModal>
      </div>
    );
  }
}

ModalAcabado.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  imagen: PropTypes.any.isRequired,
};
