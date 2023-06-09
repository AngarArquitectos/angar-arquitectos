"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _panel = require("./panel");

var _panel2 = _interopRequireDefault(_panel);

var _constants = require("../../constants");

var _sharedStyle = require("../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _fa = require("react-icons/fa");

var _filter = require("../../utils/filter");

var _formatter = require("../../utils/formatter");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VISIBILITY_MODE = {
  MODE_IDLE: _constants.MODE_IDLE,
  MODE_2D_ZOOM_IN: _constants.MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT: _constants.MODE_2D_ZOOM_OUT,
  MODE_2D_PAN: _constants.MODE_2D_PAN,
  MODE_3D_VIEW: _constants.MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON: _constants.MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE: _constants.MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_LINE: _constants.MODE_DRAWING_LINE,
  MODE_DRAWING_HOLE: _constants.MODE_DRAWING_HOLE,
  MODE_DRAWING_ITEM: _constants.MODE_DRAWING_ITEM,
  MODE_DRAGGING_LINE: _constants.MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX: _constants.MODE_DRAGGING_VERTEX,
  MODE_DRAGGING_ITEM: _constants.MODE_DRAGGING_ITEM,
  MODE_DRAGGING_HOLE: _constants.MODE_DRAGGING_HOLE,
  MODE_FITTING_IMAGE: _constants.MODE_FITTING_IMAGE,
  MODE_UPLOADING_IMAGE: _constants.MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM: _constants.MODE_ROTATING_ITEM
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
        var prices = (0, _filter.filterPrices)(itemName);

        tempPresupuesto += parseFloat(prices[0]);
        tempPresupuesto1 += parseFloat(prices[1]);
        tempPresupuesto2 += parseFloat(prices[2]);
      });

      var isEmpty = elements.items.isEmpty();
      var presupuesto = isEmpty ? 0 : (0, _formatter.formatNumber)(tempPresupuesto);
      var presupuesto1 = isEmpty ? 0 : (0, _formatter.formatNumber)(tempPresupuesto1);
      var presupuesto2 = isEmpty ? 0 : (0, _formatter.formatNumber)(tempPresupuesto2);

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

      return _react2.default.createElement(
        _panel2.default,
        { name: "Presupuesto" },
        _react2.default.createElement(
          "div",
          { style: contentArea, onWheel: function onWheel(e) {
              return e.stopPropagation();
            } },
          this.state.matchedElements.items.count() ? _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "p",
              { style: categoryDividerStyle },
              this.context.translator.t("Módulos")
            ),
            _react2.default.createElement(
              "table",
              { style: tableTabStyle },
              _react2.default.createElement(
                "tbody",
                null,
                this.state.matchedElements.items.entrySeq().map(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 2),
                      itemID = _ref2[0],
                      item = _ref2[1];

                  var name = (0, _filter.filterName)(item.name);
                  var prices = (0, _filter.filterPrices)(item.name);
                  var formatedPrices = (0, _formatter.formatNumber)(prices[0]);
                  return _react2.default.createElement(
                    "tr",
                    {
                      key: itemID,
                      style: item.selected ? elementSelectedStyle : elementStyle
                    },
                    _react2.default.createElement(
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
                    _react2.default.createElement(
                      "td",
                      { style: { width: "5em" } },
                      _react2.default.createElement(_fa.FaTrash, {
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
          this.state.matchedElements.items.count() || this.state.matchedElements.lines.count() || this.state.matchedElements.holes.count() ? _react2.default.createElement(
            _react.Fragment,
            null,
            _react2.default.createElement(
              "div",
              { style: importeStyle },
              _react2.default.createElement(
                "b",
                null,
                "TOTAL ACABADO NORMAL: "
              ),
              presupuesto,
              "\u20AC"
            ),
            _react2.default.createElement(
              "div",
              { style: importeStyle },
              _react2.default.createElement(
                "b",
                null,
                "TOTAL ACABADO 1: "
              ),
              presupuesto1,
              "\u20AC"
            ),
            _react2.default.createElement(
              "div",
              { style: importeStyle },
              _react2.default.createElement(
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
}(_react.Component);

exports.default = PanelLayerElement;


PanelLayerElement.propTypes = {
  mode: _propTypes2.default.string.isRequired,
  layers: _propTypes2.default.object.isRequired,
  presupuesto: _propTypes2.default.number.isRequired
};

PanelLayerElement.contextTypes = {
  catalog: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired,
  priceActions: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  projectActions: _propTypes2.default.object.isRequired
};