import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";
import { calculateBoundingBox, calculateMouseCoordinateWithScale } from "../utils";
import Shape from "./shape";

class Pencil extends Shape {
  constructor(points, strokeWidth, strokeColor) {
    super();
    this.id = crypto.randomUUID();
    this.points = points;
    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;

    this.type = SHAPE_TYPES.PENCIL;

    this.boundingBox = undefined;
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

  onMouseMove({ event, canvas, context, scale, origin }) {
    const pointsOnlyIncludeInitialValue = this.points.length === 1;

    if (pointsOnlyIncludeInitialValue) {
      context.beginPath();

      context.strokeStyle = this.strokeColor;
      context.lineWidth = this.strokeWidth;
      context.lineCap = 'round';
      context.lineJoin = 'round';

      context.moveTo(this.points[0].x, this.points[0].y);

      this.points.push(calculateMouseCoordinateWithScale(event, canvas, scale, origin));
      return;
    }

    const startingX = this.points[this.points.length - 1].x;
    const startingY = this.points[this.points.length - 1].y;

    const { x: endingX, y: endingY } = calculateMouseCoordinateWithScale(event, canvas, scale, origin);

    if (startingX === endingX && startingY === endingY) {
      return;
    }

    context.lineTo(endingX, endingY);
    context.stroke();

    this.points.push({ x: endingX, y: endingY });
  }

  move(changedPoints, context, clearCanvas) {
    clearCanvas();
    this.points = changedPoints;
    this.updateBoundingBox();
    this.draw(context)
    this.drawBorder(context, this.strokeWidth);
  }

  onMouseUp({ event, canvas, currentShape, addShape, clearCanvas, scale, origin }) {
    this.points.push(calculateMouseCoordinateWithScale(event, canvas, scale, origin));
    this.boundingBox = calculateBoundingBox(this.points);

    addShape(currentShape.current);
    clearCanvas();
    currentShape.current = undefined;
  }

  updateBoundingBox() {
    this.boundingBox = calculateBoundingBox(this.points);
  }
}

export default Pencil;