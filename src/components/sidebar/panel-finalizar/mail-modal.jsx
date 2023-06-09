import React, { Component } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import * as SharedStyle from "../../../shared-style";
import "bootstrap/dist/css/bootstrap.css";
export default class ToolBarMailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      phone: "",
      obsv: "",
      acabado: "",
      formErrors: {
        email: "",
        name: "",
        obsv: "",
        acabado: "",
      },
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleObservationsChange = this.handleObservationsChange.bind(this);
    this.handleAcabadoChange = this.handleAcabadoChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }

  handleObservationsChange(e) {
    this.setState({ obsv: e.target.value });
  }

  handleAcabadoChange(e) {
    this.setState({ acabado: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const formErrors = this.validateForm();
    this.setState({ formErrors });

    if (Object.keys(formErrors).length === 0) {
      const { email, name, phone, obsv, acabado } = this.state;

      const data = {
        email: email,
        name: name,
        phone: phone,
        obsv: obsv,
        acabado: acabado,
      };

      this.props.saveProject(data);
    }
  }

  validateForm() {
    const { email, name, obsv, acabado } = this.state;
    const formErrors = {};

    if (!email) {
      formErrors.email = "El campo de email es obligatorio.";
    }

    if (!name) {
      formErrors.name = "El campo de nombre es obligatorio.";
    }

    if (!obsv) {
      formErrors.obsv = "El campo de observaciones es obligatorio.";
    }

    if (!acabado) {
      formErrors.acabado = "Hay que seleccionar un acabado";
    }
    return formErrors;
  }

  render() {
    const { isOpen, onRequestClose } = this.props;

    if (!isOpen) {
      return null;
    }

    const modalStyles = {
      content: {
        width: "600px",
        height: "700px",
        margin: "auto",
        display: "flex",
        padding: "75px",
        flexDirection: "column",
        justifyContent: "center",
      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    };

    const buttonCancelStyle = {
      backgroundColor: SharedStyle.COLORS.black,
      color: SharedStyle.COLORS.white,
      width: "40%",
      fontSize: "16px",
      margin: "5px auto",
      marginRight: "10px",
      padding: "10px 20px",
      borderRadius: "0px",
      boxShadow: "none",
    };

    const buttonSendStyle = {
      backgroundColor: SharedStyle.SECONDARY_COLOR.icon,
      color: SharedStyle.COLORS.white,
      width: "40%",
      fontSize: "16px",
      margin: "5px auto",
      padding: "10px 20px",
      borderRadius: "0px",
      boxShadow: "none",
    };

    const inputStyles = {
      width: "100%",
      margin: "10px 0",
    };

    const errorStyles = {
      color: "red",
    };

    return (
      <div>
        <button></button>
        <ReactModal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          style={modalStyles}
          contentLabel="ToolBarMailModal"
        >
          <h2 style={{ textAlign: "center" }}>Enviar.</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-floating">
              <input
                className="form-control"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                style={inputStyles}
              />
              <label htmlFor="email">Email*</label>
              {this.state.formErrors.email && (
                <span className="error" style={errorStyles}>
                  {this.state.formErrors.email}
                </span>
              )}
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                id="name"
                placeholder="Nombre"
                value={this.state.name}
                onChange={this.handleNameChange}
                style={inputStyles}
              />
              <label htmlFor="name">Nombre*</label>
              {this.state.formErrors.name && (
                <span className="error" style={errorStyles}>
                  {this.state.formErrors.name}
                </span>
              )}
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                id="telefono"
                type="telefono"
                placeholder="Introduce un teléfono (opcional)"
                value={this.state.phone}
                onChange={this.handlePhoneChange}
                style={inputStyles}
              />
              <label htmlFor="telefono">Teléfono (opcional)</label>
            </div>
            <select
              className="form-select"
              aria-label="Default select example"
              style={inputStyles}
              value={this.state.acabado}
              onChange={this.handleAcabadoChange}
            >
              <option disabled value="">
                Selecciona el acabado*
              </option>
              <option value="Normal">Normal</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            {this.state.formErrors.acabado && (
              <span className="error" style={errorStyles}>
                {this.state.formErrors.acabado}
              </span>
            )}
            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Observaciones"
                id="obsv"
                value={this.state.obsv}
                onChange={this.handleObservationsChange}
                style={{ height: "100px",...inputStyles }}
              />
              <label htmlFor="obsv">Observaciones*</label>
              {this.state.formErrors.obsv && (
                <span className="error" style={errorStyles}>
                  {this.state.formErrors.obsv}
                </span>
              )}
            </div>
            <div
              style={{ textAlign: "center", resize: "none", marginTop: "30px" }}
            >
              <button
                className="btn btn-lg"
                style={buttonCancelStyle}
                onClick={onRequestClose}
              >
                Cancelar
              </button>
              <button
                className="btn btn-lg"
                style={buttonSendStyle}
                type="submit"
              >
                Enviar
              </button>
            </div>
          </form>
        </ReactModal>
      </div>
    );
  }
}

ToolBarMailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
};
