/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// @ts-nocheck
const vscode = acquireVsCodeApi();

import React from "react";
import ReactDOM from "react-dom/client";

import Whiteboard from "./components/Whiteboard/index.jsx";
import StateContextProvider from "./components/StateContextProvider/index.jsx";
import ShapesContextProvider from "./components/ShapesContextProvider/index.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateContextProvider vscode={vscode}>
      <ShapesContextProvider vscode={vscode}>
        <Whiteboard />
      </ShapesContextProvider>
    </StateContextProvider>
  </React.StrictMode>
);