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

var _panelElementEditor = require("./panel-element-editor/panel-element-editor");

var _panelElementEditor2 = _interopRequireDefault(_panelElementEditor);

var _panelGroupEditor = require("./panel-group-editor");

var _panelGroupEditor2 = _interopRequireDefault(_panelGroupEditor);

var _panelMultiElementsEditor = require("./panel-element-editor/panel-multi-elements-editor");

var _panelMultiElementsEditor2 = _interopRequireDefault(_panelMultiElementsEditor);

var _panelLayers = require("./panel-layers");

var _panelLayers2 = _interopRequireDefault(_panelLayers);

var _panelGuides = require("./panel-guides");

var _panelGuides2 = _interopRequireDefault(_panelGuides);

var _panelGroups = require("./panel-groups");

var _panelGroups2 = _interopRequireDefault(_panelGroups);

var _panelLayerElements = require("./panel-layer-elements");

var _panelLayerElements2 = _interopRequireDefault(_panelLayerElements);

var _loadSample = require("./panel-load-sample/load-sample");

var _loadSample2 = _interopRequireDefault(_loadSample);

var _sharedStyle = require("../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _reactIf = require("../../utils/react-if");

var _reactIf2 = _interopRequireDefault(_reactIf);

var _logo = require("../../logo.png");

var _logo2 = _interopRequireDefault(_logo);

var _panelFinalizar = require("./panel-finalizar/panel-finalizar");

var _panelFinalizar2 = _interopRequireDefault(_panelFinalizar);

var _panelAcabados = require("./panel-acabados/panel-acabados");

var _panelAcabados2 = _interopRequireDefault(_panelAcabados);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  display: "block",
  overflowY: "auto",
  overflowX: "hidden",
  paddingBottom: "20px"
};

var sortButtonsCb = function sortButtonsCb(a, b) {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

var mapButtonsCb = function mapButtonsCb(el, ind) {
  return _react2.default.createElement(
    _reactIf2.default,
    { key: ind, condition: el.condition, style: { position: "relative" } },
    el.dom
  );
};

var Sidebar = function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar() {
    _classCallCheck(this, Sidebar);

    return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
  }

  _createClass(Sidebar, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          state = _props.state,
          width = _props.width,
          height = _props.height,
          sidebarComponents = _props.sidebarComponents,
          allowProjectFileSupport = _props.allowProjectFileSupport,
          presupuesto = _props.presupuesto,
          _context = this.context,
          projectActions = _context.projectActions,
          priceActions = _context.priceActions,
          viewer3DActions = _context.viewer3DActions,
          translator = _context.translator;


      var sidebarheight = height * 0.8;
      var finalbuttonHeight = height * 0.1;
      var logoHeight = height * 0.1;

      var selectedLayer = state.getIn(["scene", "selectedLayer"]);
      //TODO change in multi-layer check
      var selected = state.getIn(["scene", "layers", selectedLayer, "selected"]);

      var multiselected = selected.lines.size > 1 || selected.items.size > 1 || selected.holes.size > 1 || selected.areas.size > 1 || selected.lines.size + selected.items.size + selected.holes.size + selected.areas.size > 1;

      var selectedGroup = state.getIn(["scene", "groups"]).findEntry(function (g) {
        return g.get("selected");
      });

      var sorter = [{
        index: 0,
        condition: allowProjectFileSupport,
        dom: _react2.default.createElement(_loadSample2.default, { state: state })
      }, { index: 1, condition: true, dom: _react2.default.createElement(_panelAcabados2.default, { state: state }) }, { index: 2, condition: true, dom: _react2.default.createElement(_panelLayers2.default, { state: state }) }, {
        index: 3,
        condition: true,
        dom: _react2.default.createElement(_panelLayerElements2.default, {
          mode: state.mode,
          layers: state.scene.layers,
          selectedLayer: state.scene.selectedLayer,
          presupuesto: presupuesto
        })
      }, { index: 5, condition: true, dom: _react2.default.createElement(_panelGuides2.default, { state: state }) }, {
        index: 4,
        condition: true,
        dom: _react2.default.createElement(_panelGroups2.default, {
          mode: state.mode,
          groups: state.scene.groups,
          layers: state.scene.layers
        })
      }, {
        index: 6,
        condition: !multiselected,
        dom: _react2.default.createElement(_panelElementEditor2.default, { state: state })
      },

      //{ index: 5, condition: multiselected, dom: <PanelMultiElementsEditor state={state} /> },
      {
        index: 7,
        condition: !!selectedGroup,
        dom: _react2.default.createElement(_panelGroupEditor2.default, {
          state: state,
          groupID: selectedGroup ? selectedGroup[0] : null
        })
      }];

      sorter = sorter.concat(sidebarComponents.map(function (Component, key) {
        return Component.prototype //if is a react component
        ? {
          condition: true,
          dom: _react2.default.createElement(Component, { mode: mode, state: state, key: key })
        } : {
          //else is a sortable toolbar button
          index: Component.index,
          condition: Component.condition,
          dom: _react2.default.createElement(Component.dom, { mode: mode, state: state, key: key })
        };
      }));

      return _react2.default.createElement(
        "div",
        { style: { width: width } },
        _react2.default.createElement("img", { src: _logo2.default, style: _extends({ height: logoHeight, width: width }, STYLE) }),
        _react2.default.createElement(
          "aside",
          {
            style: _extends({ height: sidebarheight }, STYLE),
            onKeyDown: function onKeyDown(event) {
              return event.stopPropagation();
            },
            onKeyUp: function onKeyUp(event) {
              return event.stopPropagation();
            },
            className: "sidebar"
          },
          sorter.sort(sortButtonsCb).map(mapButtonsCb)
        ),
        _react2.default.createElement(_panelFinalizar2.default, {
          state: state,
          style: _extends({ height: finalbuttonHeight }, STYLE)
        })
      );
    }
  }]);

  return Sidebar;
}(_react.Component);

exports.default = Sidebar;


Sidebar.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  allowProjectFileSupport: _propTypes2.default.bool.isRequired,
  toolbarButtons: _propTypes2.default.array
};

Sidebar.contextTypes = {
  priceActions: _propTypes2.default.object.isRequired,
  projectActions: _propTypes2.default.object.isRequired,
  viewer2DActions: _propTypes2.default.object.isRequired,
  viewer3DActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};