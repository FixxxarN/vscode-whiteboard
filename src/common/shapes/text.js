import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";
import { calculateBoundingBox } from "../utils";
import Shape from "./shape";

const invalidKeys = ['shift', 'meta', 'control', 'capslock', 'alt', 'enter', 'tab', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'arrowup', 'arrowright', 'arrowdown', 'arrowleft'];

class Text extends Shape {
  constructor(point, font, fillStyle) {
    super();
    this.id = crypto.randomUUID();
    this.point = point;
    this.points = [];
    this.font = font;
    this.fillStyle = fillStyle;

    this.text = '';
    this.indicate = true

    this.type = SHAPE_TYPES.TEXT;
    this.boundingBox = undefined;
  }

  draw(context) {
    context.font = this.font;
    context.fillStyle = this.fillStyle;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    context.fillText(this.text, this.point.x, this.point.y);
  }

  onKeyDown({ event, canvas, context, currentShape, addShape, clearCanvas }) {
    if (invalidKeys.includes(event.key.toLowerCase())) {
      return;
    }

    if (event.key === "Escape") {
      canvas.tabIndex = 0;

      addShape(currentShape.current);
      currentShape.current.removeTypingIndicator(context, clearCanvas);
      currentShape.current = undefined;
      return;
    }

    clearCanvas();

    this.indicate = true;

    context.font = this.font;
    context.fillStyle = this.fillStyle;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    if (event.key === "Backspace") {
      this.text = this.text.substring(0, this.text.length - 1);
    }
    else {
      this.text += event.key;
    }

    context.fillText(this.text, this.point.x, this.point.y);
  }

  move(changedPoints, context, clearCanvas) {
    clearCanvas();
    const arrayOfXCoordinates = changedPoints.map((point) => point.x);
    const arrayOfYCoordinates = changedPoints.map((point) => point.y);
    this.point = { x: Math.min(...arrayOfXCoordinates), y: Math.min(...arrayOfYCoordinates) + Number(this.font.split("px")[0]) };
    this.updateBoundingBox(context);
    this.draw(context)
    this.drawBorder(context, 1);
  }

  indicateTyping(context, clearCanvas) {
    context.font = this.font;
    context.fillStyle = this.fillStyle;

    this.interval = setInterval(() => {
      context.font = this.font;
      context.fillStyle = this.fillStyle;

      if (this.indicate) {
        clearCanvas();
        context.fillText(this.text, this.point.x, this.point.y);
        context.fillStyle = '#000';
        context.fillText('|', this.point.x + context.measureText(this.text).width, this.point.y);
        this.indicate = false;
      }
      else {
        clearCanvas();
        context.fillText(this.text, this.point.x, this.point.y);
        this.indicate = true;
      }
    }, 400)
  }

  removeTypingIndicator(context, clearCanvas) {
    clearInterval(this.interval)
    clearCanvas();
    this.points = [{ x: this.point.x, y: this.point.y }, { x: this.point.x + context.measureText(this.text).width, y: this.point.y - this.font.split("px")[0] }]
    this.updateBoundingBox(context);
  }

  setValues(shape) {
    this.text = shape.text;
  }

  updateBoundingBox(context) {
    this.points = [{ x: this.point.x, y: this.point.y }, { x: this.point.x + context.measureText(this.text).width, y: this.point.y - this.font.split("px")[0] }]
    this.boundingBox = calculateBoundingBox(this.points);
  }
}

export default Text;