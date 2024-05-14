import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";

class Text {
  constructor(point, font, fillStyle) {
    this.point = point;
    this.font = font;
    this.fillStyle = fillStyle;

    this.text = '';
    this.indicate = true

    this.type = SHAPE_TYPES.TEXT;
  }

  draw(context) {
    context.font = this.font;
    context.fillStyle = this.fillStyle;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    context.fillText(this.text, this.point.x, this.point.y);
  }

  onKeyDown(event, canvas, context, currentShape, addShape, clearCanvas) {
    if (event.key === "Escape") {
      canvas.tabIndex = 0;

      addShape(currentShape.current);
      currentShape.current.removeTypingIndicator();
      currentShape.current = undefined;
      return;
    }

    clearCanvas();

    this.indicate = false;

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
    context.fillText(this.text, this.point.x, this.point.y);
  }

  setValues(shape) {
    this.text = shape.text;
  }
}

export default Text;