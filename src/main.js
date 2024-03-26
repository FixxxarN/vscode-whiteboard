/* eslint-disable no-undef */
// @ts-nocheck
const staticCanvas = document.getElementById('whiteboard-static');
const staticCanvasContext = staticCanvas.getContext('2d');

const dynamicCanvas = document.getElementById('whiteboard-dynamic');
const dynamicCanvasContext = dynamicCanvas.getContext('2d');

let whiteboard = new Whiteboard(staticCanvas, staticCanvasContext, dynamicCanvas, dynamicCanvasContext);

whiteboard.initiateCanvas();
whiteboard.initiateCanvasEventListeners();

document.getElementById('export-button').onclick = () => {
  whiteboard.export();
}

document.getElementById('clear-button').onclick = () => {
  whiteboard.clearStaticCanvas();
}

document.getElementById('line-shape-button').onclick = () => {
  whiteboard.setSelectedShapeType('LINE');
}

document.getElementById('rectangle-shape-button').onclick = () => {
  whiteboard.setSelectedShapeType('RECTANGLE');
}

