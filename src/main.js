import React from "react";
import ReactDOM from "react-dom/client";

import Whiteboard from "./components/Whiteboard/index.jsx";
import StateContextProvider from "./components/StateContextProvider/index.jsx";
import ShapesContextProvider from "./components/ShapesContextProvider/index.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateContextProvider>
      <ShapesContextProvider>
        <Whiteboard />
      </ShapesContextProvider>
    </StateContextProvider>
  </React.StrictMode>
);