import * as Three from "three";
import { loadObjWithMaterial } from "../../utils/load-obj";

import React from "react";
import convert from "convert-units";

import obj from "./ventana_bano_60x90.obj"; //modelo 3D .obj
import mtl from "./ventana_bano_60x90.mtl"; //archivo .mtl
import imagencrop from "./80cm.jpg"; //imagen de muestra

let cached = null;
let scaleFactor = 0.1; // escala

const pointsDistance = (x1, y1, x2, y2) => {
  if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2)) {
    if (!(x1 == 0 && y1 == 0 && x2 == 0 && y2 == 0)) {
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }
  }

  return 0;
};

export default {
  name: "ventana_bano_0.60x0.90",
  prototype: "items",

  info: {
    title: "Ventana baño 0,60x0,90",
    price: "179.99",
    price1: "199.99",
    price2: "499.99",
    tag: ["furnishing"],
    description: "Modulo Baño",
    image: [imagencrop],
  },

  properties: {
    width: {
      label: "Width",
      type: "length-measure",
      defaultValue: {
        length: 130,
        unit: "cm",
      },
    },
    height: {
      label: "Height",
      type: "length-measure",
      defaultValue: {
        length: 280,
        unit: "cm",
      },
    },
    altitude: {
      label: "Altitude",
      type: "length-measure",
      defaultValue: {
        length: 0,
      },
    },

    x1: {
      label: "x1",
      type: "number",
      defaultValue: 0,
    },
    y1: {
      label: "y1",
      type: "number",
      defaultValue: 0,
    },
    x2: {
      label: "x2",
      type: "number",
      defaultValue: 100,
    },
    y2: {
      label: "y2",
      type: "number",
      defaultValue: 0,
    },
    distance: {
      label: "Distance",
      type: "length-measure",
      defaultValue: {
        length: 100,
      },
    },
  },

  render2D: function (element, layer, scene) {
    let { x1, y1, x2, y2, distance } = element.properties.toJS();

    let width = element.properties.get('width').get('length');
    let height = element.properties.get('height').get('length')
    let unit = element.properties.get('width').get('unit');

    let dist = pointsDistance(x1, y1, x2, y2);
    let scale = !isNaN(dist) && dist ? distance.length / dist : 0;

    let newWidth = convert(width).from(unit).to(scene.unit);
    let newHeight = convert(height).from(unit).to(scene.unit);

    return (
      <g
        transform={`scale(${scale}, ${scale}), scale(1,-1) translate(${
          -newWidth / 2
        },${-newHeight / 2})`}
      >
        <image
          xlinkHref={imagencrop}
          x="0"
          y="0"
          width={newWidth}
          height={newHeight}
        />
      </g>
    );
  },

  render3D: function (element, layer, scene) {
    let width = { length: 1, unit: "m" };
    let depth = { length: 1, unit: "m" };
    let height = { length: 1, unit: "m" };

    let onLoadItem = (object) => {
      let newWidth = width.length * scaleFactor;
      let newHeight = height.length * scaleFactor;
      let newDepth = depth.length * scaleFactor;

      let newAltitude = element.properties.get("altitude").get("length");

      if (element.selected) {
        let box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        box.renderOrder = 1000;
        object.add(box);
      }

      object.scale.set(newWidth, newHeight, newDepth);

      let boundingBox = new Three.Box3().setFromObject(object);

      let center = [
        (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
        (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
        (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z,
      ];

      object.position.x -= center[0];
      object.position.y -=
        center[1] - (boundingBox.max.y - boundingBox.min.y) / 2;
      object.position.z -= center[2];

      object.position.y += newAltitude;

      object.rotation.y = Math.PI;

      return object;
    };

    if (cached) {
      return Promise.resolve(onLoadItem(cached.clone()));
    }

    return loadObjWithMaterial(mtl, obj, "").then((object) => {
      cached = object;
      return onLoadItem(cached.clone());
    });
  },
};
