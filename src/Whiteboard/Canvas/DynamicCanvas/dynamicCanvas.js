// @ts-nocheck
import Canvas from "../canvas.js";
import Pencil from "../../Shape/Pencil/pencil.js";
import Rectangle from "../../Shape/Rectangle/rectangle.js";
import Circle from "../../Shape/Circle/circle.js";
import Arrow from "../../Shape/Arrow/arrow.js";
import { MOUSE_STATES, SHAPE_TYPES } from "../../constants.js";

class DynamicCanvas extends Canvas {
  constructor(canvas, context, staticCanvas) {
    super(canvas, context);

    this.selectedShapeType = SHAPE_TYPES.PENCIL;
    this.staticCanvas = staticCanvas;
  }

  initiateEventListeners() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.mouseState = MOUSE_STATES.DOWN;

      const initialPoint = { x: e.clientX - this.canvas.offsetLeft, y: e.clientY - this.canvas.offsetTop };

      switch (this.selectedShapeType) {
        case SHAPE_TYPES.PENCIL: {
          this.currentShape = new Pencil([initialPoint], this.strokeWidth, this.strokeColor);
          break;
        }
        case SHAPE_TYPES.RECTANGLE: {
          this.currentShape = new Rectangle([initialPoint], this.strokeWidth, this.strokeColor);
          break;
        }
        case SHAPE_TYPES.CIRCLE: {
          this.currentShape = new Circle([initialPoint], this.strokeWidth, this.strokeColor);
          break;
        }
        case SHAPE_TYPES.ARROW: {
          this.currentShape = new Arrow([initialPoint], this.strokeWidth, this.strokeColor);
        }
        default: {
          break;
        }
      }

      this.context.beginPath();
    });

    this.canvas.addEventListener('mouseup', (e) => {
      this.mouseState = MOUSE_STATES.UP;
      this.handleMouseUp(e);
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.mouseState === MOUSE_STATES.UP) {
        return;
      }

      if (!this.currentShape) {
        return;
      }

      this.handleMouseMove(e);
    });

    window.addEventListener('resize', () => this.resize());
  }

  handleMouseUp(e) {
    this.currentShape.points.push({ x: e.clientX - this.canvas.offsetLeft, y: e.clientY - this.canvas.offsetTop });

    this.staticCanvas.shapes.push(this.currentShape);
    this.currentShape = undefined;

    this.clear();
    this.staticCanvas.redraw();
    this.staticCanvas.history = [];
  }

  handleMouseMove(e) {
    this.currentShape.drawOngoing(e, this.canvas, this.context, () => this.clear());
  }

  setSelectedShapeType(shapeType) {
    if (SHAPE_TYPES[shapeType]) {
      this.selectedShapeType = SHAPE_TYPES[shapeType];
    }
  }
}

export default DynamicCanvas;