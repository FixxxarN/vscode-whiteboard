// @ts-nocheck

class Canvas {
  constructor(canvas, context, shapes) {
    this.canvas = canvas;
    this.context = context;
    this.shapes = shapes;

    this.strokeWidth = 1;
    this.strokeColor = 'black';
  }

  setStrokeWidth(strokeWidth) {
    this.strokeWidth = strokeWidth;
  }

  setStrokeColor(strokeColor) {
    this.strokeColor = strokeColor;
  }

  initiate() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.resize();
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
  }

  resize() {
    this.context.canvas.height = window.innerHeight;
    this.context.canvas.width = window.innerWidth;

    this.scale();
  }

  scale() {
    const scale = window.devicePixelRatio;

    this.canvas.height = Math.floor(window.innerHeight * scale);
    this.canvas.width = Math.floor(window.innerWidth * scale);

    this.context.scale(scale, scale);
  }
}

export default Canvas;