/* eslint-disable no-undef */
// @ts-nocheck
const canvas = document.getElementById('whiteboard');

let whiteboard = new Whiteboard(canvas);

whiteboard.initiateCanvas();
whiteboard.initiateCanvasEventListeners();

document.getElementById('export-button').onclick = () => {
  whiteboard.export();
}

