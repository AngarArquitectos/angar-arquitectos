var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import * as SharedStyle from "../../../shared-style";
import MailModal from "./mail-modal";
import { Project } from "../../../class/export";
import { sendEmail } from "../../../utils/mail";

var STYLE = {
  color: SharedStyle.PRIMARY_COLOR,
  borderTop: "",
  borderBottom: "",
  userSelect: "none"
};
var STYLE_TITLE = {
  fontSize: "20px",
  color: SharedStyle.COLORS.white,
  padding: "5px 15px 8px 15px",
  backgroundColor: SharedStyle.COLORS.black,
  textShadow: "",
  boxShadow: "",
  margin: "10px",
  cursor: "pointer",
  textAlign: "center"
};

var PanelFinalizar = function (_Component) {
  _inherits(PanelFinalizar, _Component);

  function PanelFinalizar(props) {
    _classCallCheck(this, PanelFinalizar);

    var _this = _possibleConstructorReturn(this, (PanelFinalizar.__proto__ || Object.getPrototypeOf(PanelFinalizar)).call(this, props));

    _this.state = {
      isModalOpen: false
    };

    _this.saveProjectToFile = _this.saveProjectToFile.bind(_this);
    _this.openModal = _this.openModal.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    return _this;
  }

  _createClass(PanelFinalizar, [{
    key: "saveProjectToFile",
    value: function saveProjectToFile(data) {
      var state = this.props.state;

      var updatedState = Project.unselectAll(state).updatedState;
      sendEmail(data, updatedState.get("scene").toJS());
      this.closeModal();
    }
  }, {
    key: "openModal",
    value: function openModal() {
      this.setState({ isModalOpen: true });
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.setState({ isModalOpen: false });
    }
  }, {
    key: "render",
    value: function render() {
      var isModalOpen = this.state.isModalOpen;


      return React.createElement(
        Fragment,
        null,
        React.createElement(
          "div",
          { style: STYLE },
          React.createElement(
            "h3",
            {
              style: _extends({}, STYLE_TITLE),
              onClick: this.openModal
            },
            "Finalizar y enviar"
          )
        ),
        React.createElement(MailModal, {
          isOpen: isModalOpen,
          onRequestClose: this.closeModal,
          saveProject: this.saveProjectToFile
        })
      );
    }
  }]);

  return PanelFinalizar;
}(Component);

export default PanelFinalizar;


PanelFinalizar.propTypes = {
  state: PropTypes.object.isRequired
};