// @ts-nocheck

import Canvas from "../canvas.js";

class StaticCanvas extends Canvas {
  constructor(canvas, context) {
    super(canvas, context);

    this.shapes = [];
  }

  initiate() {
    super.initiate();
    this.redraw();
  }

  initiateEventListeners() {
    window.addEventListener('resize', () => {
      this.resize();
      this.redraw();
    });
  }

  redraw() {
    this.clear();
    this.drawBackground();
    this.shapes.forEach((shape) => {
      this.context.beginPath();
      shape.draw(this.context);
    });
  }

  drawBackground() {
    this.context.fillStyle = '#eee';
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
    this.shapes = [];
  }
}

export default StaticCanvas;