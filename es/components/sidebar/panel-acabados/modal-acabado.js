var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import * as SharedStyle from "../../../shared-style";
import "bootstrap/dist/css/bootstrap.css";

var ModalAcabado = function (_Component) {
  _inherits(ModalAcabado, _Component);

  function ModalAcabado(props) {
    _classCallCheck(this, ModalAcabado);

    return _possibleConstructorReturn(this, (ModalAcabado.__proto__ || Object.getPrototypeOf(ModalAcabado)).call(this, props));
  }

  _createClass(ModalAcabado, [{
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
          width: "80%",
          height: "80%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }
      };

      return React.createElement(
        "div",
        null,
        React.createElement(
          ReactModal,
          {
            isOpen: isOpen,
            onRequestClose: onRequestClose,
            style: modalStyles,
            contentLabel: "ModalAcabados"
          },
          React.createElement("img", { src: this.props.imagen })
        )
      );
    }
  }]);

  return ModalAcabado;
}(Component);

export default ModalAcabado;


ModalAcabado.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  imagen: PropTypes.any.isRequired
};