"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sharedStyle = require("../../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _mailModal = require("./mail-modal");

var _mailModal2 = _interopRequireDefault(_mailModal);

var _export = require("../../../class/export");

var _mail = require("../../../utils/mail");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

      var updatedState = _export.Project.unselectAll(state).updatedState;
      (0, _mail.sendEmail)(data, updatedState.get("scene").toJS());
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


      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
          "div",
          { style: STYLE },
          _react2.default.createElement(
            "h3",
            {
              style: _extends({}, STYLE_TITLE),
              onClick: this.openModal
            },
            "Finalizar y enviar"
          )
        ),
        _react2.default.createElement(_mailModal2.default, {
          isOpen: isModalOpen,
          onRequestClose: this.closeModal,
          saveProject: this.saveProjectToFile
        })
      );
    }
  }]);

  return PanelFinalizar;
}(_react.Component);

exports.default = PanelFinalizar;


PanelFinalizar.propTypes = {
  state: _propTypes2.default.object.isRequired
};