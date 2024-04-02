/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// @ts-nocheck

import StaticCanvas from "./Canvas/StaticCanvas/staticCanvas.js";
import DynamicCanvas from "./Canvas/DynamicCanvas/dynamicCanvas.js";

class Whiteboard {
  constructor(staticCanvas, staticCanvasContext, dynamicCanvas, dynamicCanvasContext) {
    this.staticCanvas = new StaticCanvas(staticCanvas, staticCanvasContext);
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
}

export default Whiteboard;