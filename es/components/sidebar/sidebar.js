var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PanelElementEditor from "./panel-element-editor/panel-element-editor";
import PanelGroupEditor from "./panel-group-editor";
import PanelMultiElementsEditor from "./panel-element-editor/panel-multi-elements-editor";
import PanelLayers from "./panel-layers";
import PanelGuides from "./panel-guides";
import PanelGroups from "./panel-groups";
import PanelLayerElements from "./panel-layer-elements";
import LoadSample from "./panel-load-sample/load-sample";
import * as SharedStyle from "../../shared-style";
import If from "../../utils/react-if";
import logo from "../../logo.png";
import PanelFinalizar from "./panel-finalizar/panel-finalizar";
import PanelAcabados from "./panel-acabados/panel-acabados";

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
  return React.createElement(
    If,
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
        dom: React.createElement(LoadSample, { state: state })
      }, { index: 1, condition: true, dom: React.createElement(PanelAcabados, { state: state }) }, { index: 2, condition: true, dom: React.createElement(PanelLayers, { state: state }) }, {
        index: 3,
        condition: true,
        dom: React.createElement(PanelLayerElements, {
          mode: state.mode,
          layers: state.scene.layers,
          selectedLayer: state.scene.selectedLayer,
          presupuesto: presupuesto
        })
      }, { index: 5, condition: true, dom: React.createElement(PanelGuides, { state: state }) }, {
        index: 4,
        condition: true,
        dom: React.createElement(PanelGroups, {
          mode: state.mode,
          groups: state.scene.groups,
          layers: state.scene.layers
        })
      }, {
        index: 6,
        condition: !multiselected,
        dom: React.createElement(PanelElementEditor, { state: state })
      },

      //{ index: 5, condition: multiselected, dom: <PanelMultiElementsEditor state={state} /> },
      {
        index: 7,
        condition: !!selectedGroup,
        dom: React.createElement(PanelGroupEditor, {
          state: state,
          groupID: selectedGroup ? selectedGroup[0] : null
        })
      }];

      sorter = sorter.concat(sidebarComponents.map(function (Component, key) {
        return Component.prototype //if is a react component
        ? {
          condition: true,
          dom: React.createElement(Component, { mode: mode, state: state, key: key })
        } : {
          //else is a sortable toolbar button
          index: Component.index,
          condition: Component.condition,
          dom: React.createElement(Component.dom, { mode: mode, state: state, key: key })
        };
      }));

      return React.createElement(
        "div",
        { style: { width: width } },
        React.createElement("img", { src: logo, style: _extends({ height: logoHeight, width: width }, STYLE) }),
        React.createElement(
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
        React.createElement(PanelFinalizar, {
          state: state,
          style: _extends({ height: finalbuttonHeight }, STYLE)
        })
      );
    }
  }]);

  return Sidebar;
}(Component);

export default Sidebar;


Sidebar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array
};

Sidebar.contextTypes = {
  priceActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};