[![npm][npm_label]][npm_link]
![javascript][js]
![react-version][react_version]

## DOCUMENTACION

- [CREAR UN MODULO](documentacion/COMO_CREAR_UN_MODULO_PARA_EL_CATALOGO.md)

## PUNTO DE ENTRADA DE LA APLICACIÓN

[esta carpeta](demo/src) es donde compilará, ahí irán las imagenes y el archivo rederer.jsx que tiene el punto de entrada.

```es6
import React from "react";
import ReactDOM from "react-dom";
import ContainerDimensions from "react-container-dimensions";
import Immutable, { Map } from "immutable";
import immutableDevtools from "immutable-devtools";
import { createStore } from "redux";
import { Provider } from "react-redux";

import MyCatalog from "./catalog/mycatalog";

import ToolbarScreenshotButton from "./ui/toolbar-screenshot-button";

import {
  Models as PlannerModels,
  reducer as PlannerReducer,
  ReactPlanner,
  Plugins as PlannerPlugins,
} from "react-planner"; //react-planner

//define state
let AppState = Map({
  "react-planner": new PlannerModels.State(),
  presupuesto: 0, // Valor inicial del presupuesto
});

//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  switch (action.type) {
    case "ACTUALIZAR_PRESUPUESTO":
      // Actualiza el valor del presupuesto en el estado
      return state.set("presupuesto", action.payload);

    default:
      state = state.update("react-planner", (plannerState) =>
        PlannerReducer(plannerState, action)
      );
      return state;
  }
};

let blackList =
  isProduction === true
    ? []
    : ["UPDATE_MOUSE_COORDS", "UPDATE_ZOOM_SCALE", "UPDATE_2D_CAMERA"];

if (!isProduction) {
  console.info(
    "Environment is in development and these actions will be blacklisted",
    blackList
  );
  console.info("Enable Chrome custom formatter for Immutable pretty print");
  immutableDevtools(Immutable);
}

//init store
let store = createStore(
  reducer,
  null,
  !isProduction && window.devToolsExtension
    ? window.devToolsExtension({
        features: {
          pause: true, // start/pause recording of dispatched actions
          lock: true, // lock/unlock dispatching actions and side effects
          persist: true, // persist states on page reloading
          export: true, // export history of actions in a file
          import: "custom", // import history of actions from a file
          jump: true, // jump back and forth (time travelling)
          skip: true, // skip (cancel) actions
          reorder: true, // drag and drop actions in the history list
          dispatch: true, // dispatch custom actions or action creators
          test: true, // generate tests for the selected actions
        },
        actionsBlacklist: blackList,
        maxAge: 999999,
      })
    : (f) => f
);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave("react-planner_v0"),
  PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [ToolbarScreenshotButton];

//render
ReactDOM.render(
  <Provider store={store}>
    <ContainerDimensions>
      {({ width, height }) => (
        <ReactPlanner
          catalog={MyCatalog}
          width={width}
          height={height}
          plugins={plugins}
          toolbarButtons={toolbarButtons}
          stateExtractor={(state) => state.get("react-planner")}
        />
      )}
    </ContainerDimensions>
  </Provider>,
  document.getElementById("app")
);
```

## Authors

- [chrvadala](https://github.com/chrvadala)
- [danilosalvati](https://github.com/danilosalvati)
- [enricomarino](https://github.com/enricomarino)
- [federicospini](https://github.com/federicospini)
- [alessiocarrafa](https://github.com/alessiocarrafa)
- [stefanoperrone](https://github.com/stefanoperrone)

Developed @ [CVDLAB][cvdlab]

## Contributing

Your contributions (issues and pull request) are very appreciated!

## Contributors

- [JikkuJose](https://github.com/JikkuJose)
- [Yeri-Kim](https://github.com/Yeri-Kim)
- [lucacastoro](https://github.com/lucacastoro)
- [cbosse-skwirrel](https://github.com/cbosse-skwirrel)
- [JaccoGoris](https://github.com/JaccoGoris)

## License

MIT

[react]: https://facebook.github.io/react/
[npm_label]: https://img.shields.io/npm/v/react-planner.svg?maxAge=2592000?style=plastic
[npm_link]: https://www.npmjs.com/package/react-planner
[js]: https://img.shields.io/badge/javascript-ES6-fbde34.svg
[react_version]: https://img.shields.io/badge/react%20version-16.0.0%20or%20later-61dafb.svg
[preview_image]: https://raw.githubusercontent.com/cvdlab/react-planner/master/preview.png
[demo]: https://cvdlab.github.io/react-planner
[cvdlab]: http://cvdlab.org/
