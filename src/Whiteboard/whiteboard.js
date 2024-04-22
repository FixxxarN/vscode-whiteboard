/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// @ts-nocheck

import StaticCanvas from "./Canvas/StaticCanvas/staticCanvas.js";
import DynamicCanvas from "./Canvas/DynamicCanvas/dynamicCanvas.js";
import ShapeManager from "./ShapeManager/shapeManager.js";

class Whiteboard {
  constructor(staticCanvas, staticCanvasContext, dynamicCanvas, dynamicCanvasContext, vscode) {
    this.shapeManager = new ShapeManager(vscode);
    this.staticCanvas = new StaticCanvas(staticCanvas, staticCanvasContext, this.shapeManager);
    this.dynamicCanvas = new DynamicCanvas(dynamicCanvas, dynamicCanvasContext, this.staticCanvas);
  }

  initiateCanvases() {
    this.staticCanvas.initiate();
    this.dynamicCanvas.initiate();
  }

  initiateCanvasesEventListeners() {
    this.dynamicCanvas.initiateEventListeners();
    this.staticCanvas.initiateEventListeners();
  }

  setStrokeWidth(strokeWidth) {
    this.dynamicCanvas.setStrokeWidth(strokeWidth);
    this.staticCanvas.setStrokeWidth(strokeWidth);
  }

  setStrokeColor(strokeColor) {
    this.dynamicCanvas.setStrokeColor(strokeColor);
    this.staticCanvas.setStrokeColor(strokeColor);
  }
}

export default Whiteboard;