"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactModal = require("react-modal");

var _reactModal2 = _interopRequireDefault(_reactModal);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sharedStyle = require("../../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

require("bootstrap/dist/css/bootstrap.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement("button", null),
        _react2.default.createElement(
          _reactModal2.default,
          {
            isOpen: isOpen,
            onRequestClose: onRequestClose,
            style: modalStyles,
            contentLabel: "ToolBarMailModal"
          },
          _react2.default.createElement(
            "h2",
            { style: { textAlign: "center" } },
            "Enviar."
          ),
          _react2.default.createElement(
            "form",
            { onSubmit: this.handleSubmit },
            _react2.default.createElement(
              "div",
              { className: "form-floating" },
              _react2.default.createElement("input", {
                className: "form-control",
                id: "email",
                placeholder: "Email",
                value: this.state.email,
                onChange: this.handleEmailChange,
                style: inputStyles
              }),
              _react2.default.createElement(
                "label",
                { htmlFor: "email" },
                "Email*"
              ),
              this.state.formErrors.email && _react2.default.createElement(
                "span",
                { className: "error", style: errorStyles },
                this.state.formErrors.email
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "form-floating" },
              _react2.default.createElement("input", {
                className: "form-control",
                id: "name",
                placeholder: "Nombre",
                value: this.state.name,
                onChange: this.handleNameChange,
                style: inputStyles
              }),
              _react2.default.createElement(
                "label",
                { htmlFor: "name" },
                "Nombre*"
              ),
              this.state.formErrors.name && _react2.default.createElement(
                "span",
                { className: "error", style: errorStyles },
                this.state.formErrors.name
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "form-floating" },
              _react2.default.createElement("input", {
                className: "form-control",
                id: "telefono",
                type: "telefono",
                placeholder: "Introduce un tel\xE9fono (opcional)",
                value: this.state.phone,
                onChange: this.handlePhoneChange,
                style: inputStyles
              }),
              _react2.default.createElement(
                "label",
                { htmlFor: "telefono" },
                "Tel\xE9fono (opcional)"
              )
            ),
            _react2.default.createElement(
              "select",
              {
                className: "form-select",
                "aria-label": "Default select example",
                style: inputStyles,
                value: this.state.acabado,
                onChange: this.handleAcabadoChange
              },
              _react2.default.createElement(
                "option",
                { disabled: true, value: "" },
                "Selecciona el acabado*"
              ),
              _react2.default.createElement(
                "option",
                { value: "Normal" },
                "Normal"
              ),
              _react2.default.createElement(
                "option",
                { value: "1" },
                "1"
              ),
              _react2.default.createElement(
                "option",
                { value: "2" },
                "2"
              )
            ),
            this.state.formErrors.acabado && _react2.default.createElement(
              "span",
              { className: "error", style: errorStyles },
              this.state.formErrors.acabado
            ),
            _react2.default.createElement(
              "div",
              { className: "form-floating" },
              _react2.default.createElement("input", {
                className: "form-control",
                placeholder: "Observaciones",
                id: "obsv",
                value: this.state.obsv,
                onChange: this.handleObservationsChange,
                style: _extends({ height: "100px" }, inputStyles)
              }),
              _react2.default.createElement(
                "label",
                { htmlFor: "obsv" },
                "Observaciones*"
              ),
              this.state.formErrors.obsv && _react2.default.createElement(
                "span",
                { className: "error", style: errorStyles },
                this.state.formErrors.obsv
              )
            ),
            _react2.default.createElement(
              "div",
              {
                style: { textAlign: "center", resize: "none", marginTop: "30px" }
              },
              _react2.default.createElement(
                "button",
                {
                  className: "btn btn-lg",
                  style: buttonCancelStyle,
                  onClick: onRequestClose
                },
                "Cancelar"
              ),
              _react2.default.createElement(
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
}(_react.Component);

exports.default = ToolBarMailModal;


ToolBarMailModal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  onRequestClose: _propTypes2.default.func.isRequired,
  saveProject: _propTypes2.default.func.isRequired
};