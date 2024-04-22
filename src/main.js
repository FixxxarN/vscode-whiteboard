/* eslint-disable no-undef */
// @ts-nocheck
const vscode = acquireVsCodeApi();

import Whiteboard from "./Whiteboard/whiteboard.js";

const staticCanvas = document.getElementById('whiteboard-static');
const staticCanvasContext = staticCanvas.getContext('2d');

const dynamicCanvas = document.getElementById('whiteboard-dynamic');
const dynamicCanvasContext = dynamicCanvas.getContext('2d');

let whiteboard = new Whiteboard(staticCanvas, staticCanvasContext, dynamicCanvas, dynamicCanvasContext, vscode);

whiteboard.initiateCanvases();
whiteboard.initiateCanvasesEventListeners();

document.getElementById('export-button').onclick = () => {
  whiteboard.staticCanvas.export();
}

document.getElementById('clear-button').onclick = () => {
  whiteboard.staticCanvas.clear();
  whiteboard.staticCanvas.clearShapes();
}

document.getElementById('pencil-shape-button').onclick = () => {
  whiteboard.dynamicCanvas.setSelectedShapeType('PENCIL');
}

document.getElementById('rectangle-shape-button').onclick = () => {
  whiteboard.dynamicCanvas.setSelectedShapeType('RECTANGLE');
}

document.getElementById('circle-shape-button').onclick = () => {
  whiteboard.dynamicCanvas.setSelectedShapeType('CIRCLE');
}

document.getElementById('arrow-shape-button').onclick = () => {
  whiteboard.dynamicCanvas.setSelectedShapeType('ARROW');
}

document.getElementById('stroke-width-selector').onchange = (e) => {
  whiteboard.setStrokeWidth(e.target.value)
}

document.getElementById('stroke-color-selector').onchange = (e) => {
  whiteboard.setStrokeColor(e.target.value)
}
