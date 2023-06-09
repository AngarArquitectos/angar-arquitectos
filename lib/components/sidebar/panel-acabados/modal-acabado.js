"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _reactModal2.default,
          {
            isOpen: isOpen,
            onRequestClose: onRequestClose,
            style: modalStyles,
            contentLabel: "ModalAcabados"
          },
          _react2.default.createElement("img", { src: this.props.imagen })
        )
      );
    }
  }]);

  return ModalAcabado;
}(_react.Component);

exports.default = ModalAcabado;


ModalAcabado.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  onRequestClose: _propTypes2.default.func.isRequired,
  imagen: _propTypes2.default.any.isRequired
};