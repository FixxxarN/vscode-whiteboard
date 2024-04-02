/* eslint-disable no-undef */
// @ts-nocheck
import Whiteboard from "./Whiteboard/whiteboard.js";

const staticCanvas = document.getElementById('whiteboard-static');
const staticCanvasContext = staticCanvas.getContext('2d');

const dynamicCanvas = document.getElementById('whiteboard-dynamic');
const dynamicCanvasContext = dynamicCanvas.getContext('2d');

let whiteboard = new Whiteboard(staticCanvas, staticCanvasContext, dynamicCanvas, dynamicCanvasContext);

whiteboard.initiateCanvases();
whiteboard.initiateCanvasesEventListeners();

document.getElementById('export-button').onclick = () => {
  whiteboard.staticCanvas.export();
}

document.getElementById('clear-button').onclick = () => {
  whiteboard.staticCanvas.clear();
  whiteboard.staticCanvas.clearShapes();
}

document.getElementById('line-shape-button').onclick = () => {
  whiteboard.dynamicCanvas.setSelectedShapeType('LINE');
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
