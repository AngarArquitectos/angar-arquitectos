export function guardarPresupuesto(presupuesto) {
  return {
    type: "ACTUALIZAR_PRESUPUESTO",
    payload: presupuesto,
  };
}
