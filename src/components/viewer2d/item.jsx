import React from "react";
import PropTypes from "prop-types";
import If from "../../utils/react-if";
import * as SharedStyle from "../../shared-style";
import Vertex from "./vertex";

const STYLE_VERTICES = {
  fill: "#0096fd",
  stroke: SharedStyle.COLORS.white,
  cursor: "move",
};

const STYLE_CIRCLE = {
  fill: "#0096fd",
  stroke: "#0096fd",
  cursor: "ew-resize",
};

const STYLE_CIRCLE2 = {
  fill: "none",
  stroke: "#0096fd",
  cursor: "ew-resize",
};

export default function Item({ layer, item, scene, catalog }) {
  let { x, y, rotation } = item;
  let width = item.properties.get("width").get("length");
  let height = item.properties.get("height").get("length");

  let halfWidth = width / 2;
  let halfHeight = height / 2;

  let vertices = [
    [-halfWidth, halfHeight], // Esquina superior izquierda
    [halfWidth, halfHeight], // Esquina superior derecha
    [halfWidth, -halfHeight], // Esquina inferior derecha
    [-halfWidth, -halfHeight], // Esquina inferior izquierda
  ];

  let renderedItem = catalog.getElement(item.type).render2D(item, layer, scene);

  return (
    <g
      data-element-root
      data-prototype={item.prototype}
      data-id={item.id}
      data-selected={item.selected}
      data-layer={layer.id}
      style={item.selected ? { cursor: "move" } : {}}
      transform={`translate(${x},${y}) rotate(${rotation})`}
    >
      {renderedItem}
      <If condition={item.selected}>
        <g
          data-element-root
          data-prototype={item.prototype}
          data-id={item.id}
          data-selected={item.selected}
          data-layer={layer.id}
          data-part="rotation-anchor"
        >
          <circle cx="0" cy="150" r="10" style={STYLE_CIRCLE} />
          <circle cx="0" cy="0" r="150" style={STYLE_CIRCLE2} />
          <g
            data-element-root
            data-prototype={item.prototype}
            data-id={item.id}
            data-selected={item.selected}
            data-layer={layer.id}
          >
            {vertices.map(([vx, vy], index) => (
              <circle key={index} cx={vx} cy={vy} r="5" style={STYLE_VERTICES} />
            ))}
          </g>
        </g>
      </If>
    </g>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
};
