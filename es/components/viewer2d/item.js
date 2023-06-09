var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React from "react";
import PropTypes from "prop-types";
import If from "../../utils/react-if";
import * as SharedStyle from "../../shared-style";
import Vertex from "./vertex";

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

export default function Item(_ref) {
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

  return React.createElement(
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
    React.createElement(
      If,
      { condition: item.selected },
      React.createElement(
        "g",
        {
          "data-element-root": true,
          "data-prototype": item.prototype,
          "data-id": item.id,
          "data-selected": item.selected,
          "data-layer": layer.id,
          "data-part": "rotation-anchor"
        },
        React.createElement("circle", { cx: "0", cy: "150", r: "10", style: STYLE_CIRCLE }),
        React.createElement("circle", { cx: "0", cy: "0", r: "150", style: STYLE_CIRCLE2 }),
        React.createElement(
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

            return React.createElement("circle", { key: index, cx: vx, cy: vy, r: "5", style: STYLE_VERTICES });
          })
        )
      )
    )
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};