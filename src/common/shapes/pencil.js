import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";

class Pencil {
  constructor(initialPoint, strokeWidth, strokeColor) {
    this.points = [initialPoint];
    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;

    this.type = SHAPE_TYPES.PENCIL;
  }

  draw(context) {
    context.strokeStyle = this.strokeColor;
    context.lineWidth = this.strokeWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    context.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length; i++) {
      if (!this.points[i + 1]) {
        return;
      }

      context.lineTo(this.points[i].x, this.points[i].y);

      context.stroke();
    }
  }

  drawOngoing(event, canvas, context) {
    const pointsOnlyIncludeInitialValue = this.points.length === 1;

    if (pointsOnlyIncludeInitialValue) {
      context.beginPath();

      context.strokeStyle = this.strokeColor;
      context.lineWidth = this.strokeWidth;
      context.lineCap = 'round';
      context.lineJoin = 'round';

      context.moveTo(this.points[0].x, this.points[0].y);

      this.points.push({ x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop });

      return;
    }

    const startingX = this.points[this.points.length - 1].x;
    const startingY = this.points[this.points.length - 1].y;

    const endingX = event.clientX - canvas.offsetLeft;
    const endingY = event.clientY - canvas.offsetTop;

    if (startingX === endingX && startingY === endingY) {
      return;
    }

    context.lineTo(endingX, endingY);
    context.stroke();

    this.points.push({ x: endingX, y: endingY });
  }
}

export default Pencil;