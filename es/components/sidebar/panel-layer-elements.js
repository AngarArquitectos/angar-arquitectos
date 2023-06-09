var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Panel from "./panel";
import { MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE, MODE_ROTATING_ITEM } from "../../constants";
import * as SharedStyle from "../../shared-style";
import { FaTrash } from "react-icons/fa";
import { filterName, filterPrices } from "../../utils/filter";
import { formatNumber } from "../../utils/formatter";

var VISIBILITY_MODE = {
  MODE_IDLE: MODE_IDLE,
  MODE_2D_ZOOM_IN: MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT: MODE_2D_ZOOM_OUT,
  MODE_2D_PAN: MODE_2D_PAN,
  MODE_3D_VIEW: MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON: MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE: MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_LINE: MODE_DRAWING_LINE,
  MODE_DRAWING_HOLE: MODE_DRAWING_HOLE,
  MODE_DRAWING_ITEM: MODE_DRAWING_ITEM,
  MODE_DRAGGING_LINE: MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX: MODE_DRAGGING_VERTEX,
  MODE_DRAGGING_ITEM: MODE_DRAGGING_ITEM,
  MODE_DRAGGING_HOLE: MODE_DRAGGING_HOLE,
  MODE_FITTING_IMAGE: MODE_FITTING_IMAGE,
  MODE_UPLOADING_IMAGE: MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM: MODE_ROTATING_ITEM
};

var contentArea = {
  height: "auto",
  maxHeight: "15em",
  overflowY: "auto",
  padding: "0.25em 1.15em",
  cursor: "pointer",
  marginBottom: "1em",
  userSelect: "none"
};

var elementStyle = {
  width: "auto",
  height: "2.5em",
  margin: "0.25em 0.25em 0 0",
  padding: "0.5em",
  textAlign: "left",
  display: "inline-block",
  border: "1px solid " + SharedStyle.COLORS.white,
  borderRadius: "0.2em"
};

var elementSelectedStyle = {
  width: "auto",
  height: "2.5em",
  margin: "0.25em 0.25em 0 0",
  padding: "0.5em",
  textAlign: "left",
  display: "inline-block",
  border: "1px solid",
  borderRadius: "0.2em",
  color: SharedStyle.SECONDARY_COLOR.main,
  borderColor: SharedStyle.SECONDARY_COLOR.main
};

var categoryDividerStyle = {
  paddingBottom: "0.5em",
  borderBottom: "1px solid #888"
};

var importeStyle = {
  borderBottom: "1px solid #888",
  paddingTop: "0.5em",
  textAlign: "right"
};

var tableSearchStyle = { width: "100%", marginTop: "0.8em" };
var searchIconStyle = { fontSize: "1.5em" };
var searchInputStyle = {
  fontSize: "1em",
  width: "100%",
  height: "1em",
  padding: "1em 0.5em"
};

var iconStyle = {
  fontSize: "14px",
  margin: "2px",
  cursor: "pointer"
};

var tableTabStyle = {
  width: "100%",
  textAlign: "left"
};

var PanelLayerElement = function (_Component) {
  _inherits(PanelLayerElement, _Component);

  function PanelLayerElement(props, context) {
    _classCallCheck(this, PanelLayerElement);

    var _this = _possibleConstructorReturn(this, (PanelLayerElement.__proto__ || Object.getPrototypeOf(PanelLayerElement)).call(this, props, context));

    var layer = props.layers.get(props.selectedLayer);
    var elements = {
      lines: layer.lines,
      holes: layer.holes,
      items: layer.items
    };

    _this.state = {
      elements: elements,
      matchString: "",
      matchedElements: elements,
      presupuesto: 0,
      presupuesto1: 0,
      presupuesto2: 0
    };
    return _this;
  }

  _createClass(PanelLayerElement, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.matchString !== nextState.matchString) return true;

      var oldElements = this.state.elements;
      var newElements = nextState.elements;

      if (oldElements.lines.hashCode() !== newElements.lines.hashCode() || oldElements.holes.hashCode() !== newElements.holes.hashCode() || oldElements.items.hashCode() !== newElements.items.hashCode()) return true;

      return false;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var layer = nextProps.layers.get(nextProps.selectedLayer);

      if (this.props.layers.hashCode() === nextProps.layers.hashCode()) return;

      var elements = {
        lines: layer.lines,
        holes: layer.holes,
        items: layer.items
      };

      if (this.state.matchString !== "") {
        var regexp = new RegExp(this.state.matchString, "i");
        var filterCb = function filterCb(el) {
          return regexp.test(el.get("name"));
        };

        this.setState({
          matchedElements: {
            elements: elements,
            lines: elements.lines.filter(filterCb),
            holes: elements.holes.filter(filterCb),
            items: elements.items.filter(filterCb)
          }
        });
      } else {
        this.setState({ elements: elements, matchedElements: elements });
      }

      var tempPresupuesto = 0;
      var tempPresupuesto1 = 0;
      var tempPresupuesto2 = 0;

      elements.items.forEach(function (item) {
        var itemName = item.get("name");
        var prices = filterPrices(itemName);

        tempPresupuesto += parseFloat(prices[0]);
        tempPresupuesto1 += parseFloat(prices[1]);
        tempPresupuesto2 += parseFloat(prices[2]);
      });

      var isEmpty = elements.items.isEmpty();
      var presupuesto = isEmpty ? 0 : formatNumber(tempPresupuesto);
      var presupuesto1 = isEmpty ? 0 : formatNumber(tempPresupuesto1);
      var presupuesto2 = isEmpty ? 0 : formatNumber(tempPresupuesto2);

      this.setState({
        presupuesto: presupuesto,
        presupuesto1: presupuesto1,
        presupuesto2: presupuesto2
      });
    }
  }, {
    key: "matcharray",
    value: function matcharray(text) {
      if (text === "") {
        this.setState({
          matchString: "",
          matchedElements: this.state.elements
        });
        return;
      }

      var regexp = new RegExp(text, "i");
      var filterCb = function filterCb(el) {
        return regexp.test(el.get("name"));
      };

      this.setState({
        matchString: text,
        matchedElements: {
          lines: this.state.elements.lines.filter(filterCb),
          holes: this.state.elements.holes.filter(filterCb),
          items: this.state.elements.items.filter(filterCb)
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!VISIBILITY_MODE[this.props.mode]) return null;

      var layer = this.props.layers.get(this.props.selectedLayer);
      var _state = this.state,
          presupuesto = _state.presupuesto,
          presupuesto1 = _state.presupuesto1,
          presupuesto2 = _state.presupuesto2;

      return React.createElement(
        Panel,
        { name: "Presupuesto" },
        React.createElement(
          "div",
          { style: contentArea, onWheel: function onWheel(e) {
              return e.stopPropagation();
            } },
          this.state.matchedElements.items.count() ? React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              { style: categoryDividerStyle },
              this.context.translator.t("Módulos")
            ),
            React.createElement(
              "table",
              { style: tableTabStyle },
              React.createElement(
                "tbody",
                null,
                this.state.matchedElements.items.entrySeq().map(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 2),
                      itemID = _ref2[0],
                      item = _ref2[1];

                  var name = filterName(item.name);
                  var prices = filterPrices(item.name);
                  var formatedPrices = formatNumber(prices[0]);
                  return React.createElement(
                    "tr",
                    {
                      key: itemID,
                      style: item.selected ? elementSelectedStyle : elementStyle
                    },
                    React.createElement(
                      "td",
                      {
                        onClick: function onClick(e) {
                          return _this2.context.itemsActions.selectItem(layer.id, item.id);
                        },
                        style: { width: "30em" }
                      },
                      name,
                      ": ",
                      formatedPrices,
                      "\u20AC"
                    ),
                    React.createElement(
                      "td",
                      { style: { width: "5em" } },
                      React.createElement(FaTrash, {
                        style: iconStyle,
                        onClick: function onClick(e) {
                          _this2.context.itemsActions.selectItem(layer.id, item.id);
                          _this2.context.projectActions.remove();
                        }
                      })
                    )
                  );
                })
              )
            )
          ) : null,
          this.state.matchedElements.items.count() || this.state.matchedElements.lines.count() || this.state.matchedElements.holes.count() ? React.createElement(
            Fragment,
            null,
            React.createElement(
              "div",
              { style: importeStyle },
              React.createElement(
                "b",
                null,
                "TOTAL ACABADO NORMAL: "
              ),
              presupuesto,
              "\u20AC"
            ),
            React.createElement(
              "div",
              { style: importeStyle },
              React.createElement(
                "b",
                null,
                "TOTAL ACABADO 1: "
              ),
              presupuesto1,
              "\u20AC"
            ),
            React.createElement(
              "div",
              { style: importeStyle },
              React.createElement(
                "b",
                null,
                "TOTAL ACABADO 2: "
              ),
              presupuesto2,
              "\u20AC"
            )
          ) : null
        )
      );
    }
  }]);

  return PanelLayerElement;
}(Component);

export default PanelLayerElement;


PanelLayerElement.propTypes = {
  mode: PropTypes.string.isRequired,
  layers: PropTypes.object.isRequired,
  presupuesto: PropTypes.number.isRequired
};

PanelLayerElement.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  priceActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};