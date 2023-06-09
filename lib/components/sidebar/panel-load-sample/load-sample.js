"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LoadSample;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cat = require("./cat.png");

var _cat2 = _interopRequireDefault(_cat);

var _panel = require("../panel");

var _panel2 = _interopRequireDefault(_panel);

var _reactTabs = require("react-tabs");

var _browser = require("../../../utils/browser");

var _sample = require("../../../samples/sample1.json");

var _sample2 = _interopRequireDefault(_sample);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LoadSample(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var handleClick = function handleClick(event) {
    event.preventDefault();
    projectActions.loadProject(_sample2.default);
  };

  var styles = {
    width: "200px",
    height: "auto"
  };

  var tabStyles = {
    border: "",
    margin: "10px"
  };

  return _react2.default.createElement(
    _panel2.default,
    { name: "Cargar Diseños" },
    _react2.default.createElement(
      "table",
      { style: tabStyles },
      _react2.default.createElement(
        "tr",
        null,
        _react2.default.createElement(
          "td",
          null,
          _react2.default.createElement("img", { src: _cat2.default, style: styles, onClick: handleClick })
        )
      )
    )
  );
}

LoadSample.propTypes = {
  state: _propTypes2.default.object.isRequired
};

LoadSample.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};