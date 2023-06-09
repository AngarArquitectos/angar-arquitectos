"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guardarPresupuesto = guardarPresupuesto;
function guardarPresupuesto(presupuesto) {
  return {
    type: "ACTUALIZAR_PRESUPUESTO",
    payload: presupuesto
  };
}