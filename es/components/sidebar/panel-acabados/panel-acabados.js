var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Panel from "../panel";
import ModalAcabado from "./modal-acabado";
import imagenes from "./imagenes/export";

var imageContainerStyle = {
  display: "flex",
  justifyContent: "center"
};

var tabStyle = { margin: "1em" };

var previewStyles = {
  width: "300px",
  height: "auto"
};

var PanelAcabados = function (_Component) {
  _inherits(PanelAcabados, _Component);

  function PanelAcabados(props, context) {
    _classCallCheck(this, PanelAcabados);

    var _this = _possibleConstructorReturn(this, (PanelAcabados.__proto__ || Object.getPrototypeOf(PanelAcabados)).call(this, props, context));

    _this.state = {
      isModalOpen: false,
      selectedImage: null,
      imagenes: imagenes
    };

    _this.openModal = _this.openModal.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    return _this;
  }

  _createClass(PanelAcabados, [{
    key: "openModal",
    value: function openModal(selectedImage) {
      this.setState({ isModalOpen: true, selectedImage: selectedImage });
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.setState({ isModalOpen: false, selectedImage: null });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          isModalOpen = _state.isModalOpen,
          imagenes = _state.imagenes,
          selectedImage = _state.selectedImage;

      var imagePath = "./imagenes/";
      return React.createElement(
        Fragment,
        null,
        React.createElement(
          Panel,
          { name: "Acabados" },
          React.createElement(
            Tabs,
            { id: "acabadosTabs", style: tabStyle },
            React.createElement(
              TabList,
              null,
              imagenes.map(function (imagen, index) {
                return React.createElement(
                  Tab,
                  { key: index },
                  "Acabado ",
                  index + 1
                );
              })
            ),
            imagenes.map(function (imagen, index) {
              return React.createElement(
                TabPanel,
                { key: index },
                React.createElement(
                  "div",
                  { style: imageContainerStyle },
                  React.createElement("img", {
                    style: previewStyles,
                    src: imagen,
                    alt: "Imagen",
                    onClick: function onClick() {
                      return _this2.openModal(imagen);
                    }
                  })
                )
              );
            })
          )
        ),
        React.createElement(ModalAcabado, { isOpen: isModalOpen, onRequestClose: this.closeModal, imagen: selectedImage })
      );
    }
  }]);

  return PanelAcabados;
}(Component);

export default PanelAcabados;


PanelAcabados.propTypes = {
  state: PropTypes.object.isRequired
};