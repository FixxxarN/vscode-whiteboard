/* eslint-disable no-undef */
// @ts-nocheck
const canvas = document.getElementById('whiteboard');
const context = canvas.getContext('2d');

let whiteboard = new Whiteboard(canvas, context);

whiteboard.initiateCanvas();
whiteboard.initiateCanvasEventListeners();

document.getElementById('export-button').onclick = () => {
  whiteboard.export();
}

document.getElementById('clear-button').onclick = () => {
  whiteboard.clearCanvas();
}

