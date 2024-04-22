// @ts-nocheck

import Canvas from "../canvas.js";
import { initializeEventListenersForOS } from "./eventHandlers.js";

class StaticCanvas extends Canvas {
  constructor(canvas, context, shapeManager) {
    super(canvas, context);

    this.shapeManager = shapeManager;
  }

  initiate() {
    super.initiate();
    this.redraw();
  }

  initiateEventListeners() {
    initializeEventListenersForOS(this)
    window.addEventListener('resize', () => {
      this.resize();
      this.redraw();
    });
  }

  redraw() {
    this.clear();
    this.drawBackground();
    this.shapeManager.shapes.forEach((shape) => {
      this.context.beginPath();
      shape.draw(this.context);
    });
  }

  drawBackground() {
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  export() {
    const downloadLink = document.createElement('a');

    this.canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);

      downloadLink.setAttribute('download', 'whiteboard.png');
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
  }

  clearShapes() {
    this.shapeManager.clearShapes();
  }
}

export default StaticCanvas;