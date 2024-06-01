import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";
import { calculateBoundingBox, calculateMouseCoordinateWithScale } from "../utils";
import Shape from "./shape";

class Rectangle extends Shape {
  constructor(points, strokeWidth, strokeColor) {
    super();
    this.id = crypto.randomUUID();
    this.points = points;
    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;

    this.type = SHAPE_TYPES.RECTANGLE;

    this.boundingBox = undefined;
  }

  draw(context) {
    context.strokeStyle = this.strokeColor;
    context.lineWidth = this.strokeWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    const startingX = this.points[0].x;
    const startingY = this.points[0].y;

    const endingX = this.points[1].x;
    const endingY = this.points[1].y;

    context.rect(startingX, startingY, endingX - startingX, endingY - startingY);
    context.stroke();
  }

  onMouseMove({ event, canvas, context, clearCanvas, scale, origin }) {
    clearCanvas();

    context.strokeStyle = this.strokeColor;
    context.lineWidth = this.strokeWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    const startingX = this.points[0].x;
    const startingY = this.points[0].y;

    const newPoint = calculateMouseCoordinateWithScale(event, canvas, scale, origin);

    context.rect(startingX, startingY, newPoint.x - startingX, newPoint.y - startingY);
    context.stroke();
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

export default Rectangle;