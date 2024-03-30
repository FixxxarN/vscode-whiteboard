/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// @ts-nocheck

import Line from "./Whiteboard/Shape/Line/line.js ";
import Rectangle from "./Whiteboard/Shape/Rectangle/rectangle.js";
import Circle from "./Whiteboard/Shape/Circle/circle.js";

const MOUSE_STATES = {
  DOWN: 'DOWN',
  UP: 'UP'
}

const SHAPE_TYPES = {
  LINE: 'LINE',
  RECTANGLE: 'RECTANGLE',
  CIRCLE: 'CIRCLE'
}

class Whiteboard {
  constructor(staticCanvas, staticCanvasContext, dynamicCanvas, dynamicCanvasContext) {
    this.staticCanvas = staticCanvas;
    this.staticCanvasContext = staticCanvasContext;
    this.dynamicCanvas = dynamicCanvas;
    this.dynamicCanvasContext = dynamicCanvasContext;

    this.dynamicCanvasContext.lineWidth = 2;
    this.dynamicCanvasContext.lineCap = 'round';
    this.dynamicCanvasContext.lineJoin = 'round';

    this.staticCanvasContext.lineWidth = 2;
    this.staticCanvasContext.lineCap = 'round';
    this.staticCanvasContext.lineJoin = 'round';

    this.shapes = [];
    this.selectedShapeType = SHAPE_TYPES.LINE;
  }

  initiateCanvas() {
    this.staticCanvas.height = window.innerHeight;
    this.staticCanvas.width = window.innerWidth;

    this.dynamicCanvas.height = window.innerHeight;
    this.dynamicCanvas.width = window.innerWidth;

    this.resizeCanvas();
  }

  initiateCanvasEventListeners() {
    this.dynamicCanvas.addEventListener('mousedown', (e) => {
      this.mouseState = MOUSE_STATES.DOWN;

      const initialPoint = { x: e.clientX - this.dynamicCanvas.offsetLeft, y: e.clientY - this.dynamicCanvas.offsetTop };

      switch (this.selectedShapeType) {
        case SHAPE_TYPES.LINE: {
          this.currentShape = new Line([initialPoint]);
          break;
        }
        case SHAPE_TYPES.RECTANGLE: {
          this.currentShape = new Rectangle([initialPoint]);
          break;
        }
        case SHAPE_TYPES.CIRCLE: {
          this.currentShape = new Circle([initialPoint]);
          break;
        }
        default: {
          break;
        }
      }

      this.dynamicCanvasContext.beginPath();
    });

    this.dynamicCanvas.addEventListener('mouseup', (e) => {
      this.mouseState = MOUSE_STATES.UP;
      this.handleMouseUp(e);
    });

    this.dynamicCanvas.addEventListener('mousemove', (e) => {
      if (this.mouseState === MOUSE_STATES.UP) {
        return;
      }

      if (!this.currentShape) {
        return;
      }

      this.handleMouseMove(e);
    });

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  handleMouseUp(e) {
    this.currentShape.points.push({ x: e.clientX - this.dynamicCanvas.offsetLeft, y: e.clientY - this.dynamicCanvas.offsetTop });

    this.shapes.push(this.currentShape);
    this.currentShape = undefined;

    this.clearDynamicCanvas();
    this.redrawCanvas();
  }

  handleMouseMove(e) {
    this.currentShape.drawOngoing(e, this.dynamicCanvas, this.dynamicCanvasContext, () => this.clearDynamicCanvas());
  }

  export() {
    const downloadLink = document.createElement('a');

    this.staticCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);

      downloadLink.setAttribute('download', 'whiteboard.png');
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
  }

  clearShapes() {
    this.shapes = [];
  }

  clearStaticCanvas() {
    this.staticCanvasContext.clearRect(0, 0, this.staticCanvas.width, this.staticCanvas.height);
    this.staticCanvasContext.beginPath();
  }

  clearDynamicCanvas() {
    this.dynamicCanvasContext.clearRect(0, 0, this.dynamicCanvas.width, this.dynamicCanvas.height);
    this.dynamicCanvasContext.beginPath();
  }

  resizeCanvas() {
    this.staticCanvasContext.canvas.height = window.innerHeight;
    this.staticCanvasContext.canvas.width = window.innerWidth;

    this.dynamicCanvasContext.canvas.height = window.innerHeight;
    this.dynamicCanvasContext.canvas.width = window.innerWidth;

    this.scaleCanvas();
  }

  scaleCanvas() {
    const scale = window.devicePixelRatio;

    this.staticCanvas.height = Math.floor(window.innerHeight * scale);
    this.staticCanvas.width = Math.floor(window.innerWidth * scale);

    this.staticCanvasContext.scale(scale, scale);

    this.dynamicCanvas.height = Math.floor(window.innerHeight * scale);
    this.dynamicCanvas.width = Math.floor(window.innerWidth * scale);

    this.dynamicCanvasContext.scale(scale, scale);

    this.redrawCanvas();
  }

  redrawCanvas() {
    this.clearStaticCanvas();
    this.shapes.forEach((shape) => {
      this.staticCanvasContext.beginPath();
      shape.draw(this.staticCanvasContext);
    })
  }

  setSelectedShapeType(shapeType) {
    if (SHAPE_TYPES[shapeType]) {
      this.selectedShapeType = SHAPE_TYPES[shapeType];
    }
  }
}

export default Whiteboard;