var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import * as SharedStyle from "../../../shared-style";
import "bootstrap/dist/css/bootstrap.css";

var ToolBarMailModal = function (_Component) {
  _inherits(ToolBarMailModal, _Component);

  function ToolBarMailModal(props) {
    _classCallCheck(this, ToolBarMailModal);

    var _this = _possibleConstructorReturn(this, (ToolBarMailModal.__proto__ || Object.getPrototypeOf(ToolBarMailModal)).call(this, props));

    _this.state = {
      email: "",
      name: "",
      phone: "",
      obsv: "",
      acabado: "",
      formErrors: {
        email: "",
        name: "",
        obsv: "",
        acabado: ""
      }
    };

    _this.handleEmailChange = _this.handleEmailChange.bind(_this);
    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.handlePhoneChange = _this.handlePhoneChange.bind(_this);
    _this.handleObservationsChange = _this.handleObservationsChange.bind(_this);
    _this.handleAcabadoChange = _this.handleAcabadoChange.bind(_this);

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(ToolBarMailModal, [{
    key: "handleEmailChange",
    value: function handleEmailChange(e) {
      this.setState({ email: e.target.value });
    }
  }, {
    key: "handleNameChange",
    value: function handleNameChange(e) {
      this.setState({ name: e.target.value });
    }
  }, {
    key: "handlePhoneChange",
    value: function handlePhoneChange(e) {
      this.setState({ phone: e.target.value });
    }
  }, {
    key: "handleObservationsChange",
    value: function handleObservationsChange(e) {
      this.setState({ obsv: e.target.value });
    }
  }, {
    key: "handleAcabadoChange",
    value: function handleAcabadoChange(e) {
      this.setState({ acabado: e.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();

      var formErrors = this.validateForm();
      this.setState({ formErrors: formErrors });

      if (Object.keys(formErrors).length === 0) {
        var _state = this.state,
            email = _state.email,
            name = _state.name,
            phone = _state.phone,
            obsv = _state.obsv,
            acabado = _state.acabado;


        var data = {
          email: email,
          name: name,
          phone: phone,
          obsv: obsv,
          acabado: acabado
        };

        this.props.saveProject(data);
      }
    }
  }, {
    key: "validateForm",
    value: function validateForm() {
      var _state2 = this.state,
          email = _state2.email,
          name = _state2.name,
          obsv = _state2.obsv,
          acabado = _state2.acabado;

      var formErrors = {};

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
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          isOpen = _props.isOpen,
          onRequestClose = _props.onRequestClose;


      if (!isOpen) {
        return null;
      }

      var modalStyles = {
        content: {
          width: "600px",
          height: "700px",
          margin: "auto",
          display: "flex",
          padding: "75px",
          flexDirection: "column",
          justifyContent: "center"
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }
      };

      var buttonCancelStyle = {
        backgroundColor: SharedStyle.COLORS.black,
        color: SharedStyle.COLORS.white,
        width: "40%",
        fontSize: "16px",
        margin: "5px auto",
        marginRight: "10px",
        padding: "10px 20px",
        borderRadius: "0px",
        boxShadow: "none"
      };

      var buttonSendStyle = {
        backgroundColor: SharedStyle.SECONDARY_COLOR.icon,
        color: SharedStyle.COLORS.white,
        width: "40%",
        fontSize: "16px",
        margin: "5px auto",
        padding: "10px 20px",
        borderRadius: "0px",
        boxShadow: "none"
      };

      var inputStyles = {
        width: "100%",
        margin: "10px 0"
      };

      var errorStyles = {
        color: "red"
      };

      return React.createElement(
        "div",
        null,
        React.createElement("button", null),
        React.createElement(
          ReactModal,
          {
            isOpen: isOpen,
            onRequestClose: onRequestClose,
            style: modalStyles,
            contentLabel: "ToolBarMailModal"
          },
          React.createElement(
            "h2",
            { style: { textAlign: "center" } },
            "Enviar."
          ),
          React.createElement(
            "form",
            { onSubmit: this.handleSubmit },
            React.createElement(
              "div",
              { className: "form-floating" },
              React.createElement("input", {
                className: "form-control",
                id: "email",
                placeholder: "Email",
                value: this.state.email,
                onChange: this.handleEmailChange,
                style: inputStyles
              }),
              React.createElement(
                "label",
                { htmlFor: "email" },
                "Email*"
              ),
              this.state.formErrors.email && React.createElement(
                "span",
                { className: "error", style: errorStyles },
                this.state.formErrors.email
              )
            ),
            React.createElement(
              "div",
              { className: "form-floating" },
              React.createElement("input", {
                className: "form-control",
                id: "name",
                placeholder: "Nombre",
                value: this.state.name,
                onChange: this.handleNameChange,
                style: inputStyles
              }),
              React.createElement(
                "label",
                { htmlFor: "name" },
                "Nombre*"
              ),
              this.state.formErrors.name && React.createElement(
                "span",
                { className: "error", style: errorStyles },
                this.state.formErrors.name
              )
            ),
            React.createElement(
              "div",
              { className: "form-floating" },
              React.createElement("input", {
                className: "form-control",
                id: "telefono",
                type: "telefono",
                placeholder: "Introduce un tel\xE9fono (opcional)",
                value: this.state.phone,
                onChange: this.handlePhoneChange,
                style: inputStyles
              }),
              React.createElement(
                "label",
                { htmlFor: "telefono" },
                "Tel\xE9fono (opcional)"
              )
            ),
            React.createElement(
              "select",
              {
                className: "form-select",
                "aria-label": "Default select example",
                style: inputStyles,
                value: this.state.acabado,
                onChange: this.handleAcabadoChange
              },
              React.createElement(
                "option",
                { disabled: true, value: "" },
                "Selecciona el acabado*"
              ),
              React.createElement(
                "option",
                { value: "Normal" },
                "Normal"
              ),
              React.createElement(
                "option",
                { value: "1" },
                "1"
              ),
              React.createElement(
                "option",
                { value: "2" },
                "2"
              )
            ),
            this.state.formErrors.acabado && React.createElement(
              "span",
              { className: "error", style: errorStyles },
              this.state.formErrors.acabado
            ),
            React.createElement(
              "div",
              { className: "form-floating" },
              React.createElement("input", {
                className: "form-control",
                placeholder: "Observaciones",
                id: "obsv",
                value: this.state.obsv,
                onChange: this.handleObservationsChange,
                style: _extends({ height: "100px" }, inputStyles)
              }),
              React.createElement(
                "label",
                { htmlFor: "obsv" },
                "Observaciones*"
              ),
              this.state.formErrors.obsv && React.createElement(
                "span",
                { className: "error", style: errorStyles },
                this.state.formErrors.obsv
              )
            ),
            React.createElement(
              "div",
              {
                style: { textAlign: "center", resize: "none", marginTop: "30px" }
              },
              React.createElement(
                "button",
                {
                  className: "btn btn-lg",
                  style: buttonCancelStyle,
                  onClick: onRequestClose
                },
                "Cancelar"
              ),
              React.createElement(
                "button",
                {
                  className: "btn btn-lg",
                  style: buttonSendStyle,
                  type: "submit"
                },
                "Enviar"
              )
            )
          )
        )
      );
    }
  }]);

  return ToolBarMailModal;
}(Component);

export default ToolBarMailModal;


ToolBarMailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired
};