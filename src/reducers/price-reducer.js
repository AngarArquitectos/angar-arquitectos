const initialState = {
  presupuesto: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SAVE_PRICE":
      return {
        ...state,
        presupuesto: action.payload,
      };
    default:
      return state;
  }
}
