/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// @ts-nocheck

import StaticCanvas from "./Canvas/StaticCanvas/staticCanvas.js";
import DynamicCanvas from "./Canvas/DynamicCanvas/dynamicCanvas.js";
import { SHAPE_TYPES } from "./constants.js";

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

  setSelectedShapeType(shapeType) {
    if (SHAPE_TYPES[shapeType]) {
      this.dynamicCanvas.selectedShapeType = SHAPE_TYPES[shapeType];
    }
  }
}

export default Whiteboard;