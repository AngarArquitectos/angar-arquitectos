"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Item;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIf = require("../../utils/react-if");

var _reactIf2 = _interopRequireDefault(_reactIf);

var _sharedStyle = require("../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _vertex = require("./vertex");

var _vertex2 = _interopRequireDefault(_vertex);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE_VERTICES = {
  fill: "#0096fd",
  stroke: SharedStyle.COLORS.white,
  cursor: "move"
};

var STYLE_CIRCLE = {
  fill: "#0096fd",
  stroke: "#0096fd",
  cursor: "ew-resize"
};

var STYLE_CIRCLE2 = {
  fill: "none",
  stroke: "#0096fd",
  cursor: "ew-resize"
};

function Item(_ref) {
  var layer = _ref.layer,
      item = _ref.item,
      scene = _ref.scene,
      catalog = _ref.catalog;
  var x = item.x,
      y = item.y,
      rotation = item.rotation;

  var width = item.properties.get("width").get("length");
  var height = item.properties.get("height").get("length");

  var halfWidth = width / 2;
  var halfHeight = height / 2;

  var vertices = [[-halfWidth, halfHeight], // Esquina superior izquierda
  [halfWidth, halfHeight], // Esquina superior derecha
  [halfWidth, -halfHeight], // Esquina inferior derecha
  [-halfWidth, -halfHeight]];

  var renderedItem = catalog.getElement(item.type).render2D(item, layer, scene);

  return _react2.default.createElement(
    "g",
    {
      "data-element-root": true,
      "data-prototype": item.prototype,
      "data-id": item.id,
      "data-selected": item.selected,
      "data-layer": layer.id,
      style: item.selected ? { cursor: "move" } : {},
      transform: "translate(" + x + "," + y + ") rotate(" + rotation + ")"
    },
    renderedItem,
    _react2.default.createElement(
      _reactIf2.default,
      { condition: item.selected },
      _react2.default.createElement(
        "g",
        {
          "data-element-root": true,
          "data-prototype": item.prototype,
          "data-id": item.id,
          "data-selected": item.selected,
          "data-layer": layer.id,
          "data-part": "rotation-anchor"
        },
        _react2.default.createElement("circle", { cx: "0", cy: "150", r: "10", style: STYLE_CIRCLE }),
        _react2.default.createElement("circle", { cx: "0", cy: "0", r: "150", style: STYLE_CIRCLE2 }),
        _react2.default.createElement(
          "g",
          {
            "data-element-root": true,
            "data-prototype": item.prototype,
            "data-id": item.id,
            "data-selected": item.selected,
            "data-layer": layer.id
          },
          vertices.map(function (_ref2, index) {
            var _ref3 = _slicedToArray(_ref2, 2),
                vx = _ref3[0],
                vy = _ref3[1];

            return _react2.default.createElement("circle", { key: index, cx: vx, cy: vy, r: "5", style: STYLE_VERTICES });
          })
        )
      )
    )
  );
}

Item.propTypes = {
  item: _propTypes2.default.object.isRequired,
  layer: _propTypes2.default.object.isRequired,
  scene: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired
};