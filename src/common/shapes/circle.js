import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";
import { calculateBoundingBox } from "../utils";

class Circle {
  constructor(points, strokeWidth, strokeColor) {
    this.id = crypto.randomUUID();
    this.points = points;
    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;

    this.type = SHAPE_TYPES.CIRCLE;

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

    context.arc(startingX + ((endingX - startingX) / 2), startingY + ((endingY - startingY) / 2), Math.abs((endingX - startingX) / 2), 0, 2 * Math.PI);
    context.stroke();
  }

  onMouseMove(event, canvas, context, clearCanvas) {
    clearCanvas();

    context.strokeStyle = this.strokeColor;
    context.lineWidth = this.strokeWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    const startingX = this.points[0].x;
    const startingY = this.points[0].y;

    const newPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop }

    context.arc(startingX + ((newPoint.x - startingX) / 2), startingY + ((newPoint.y - startingY) / 2), Math.abs((newPoint.x - startingX) / 2), 0, 2 * Math.PI);
    context.stroke();
  }

  move(changedPoints, context, clearCanvas) {
    clearCanvas();
    this.points = changedPoints;
    this.draw(context)
  }

  onMouseUp(event, canvas, context, currentShape, addShape, clearCanvas) {
    this.points.push({ x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop });
    this.boundingBox = calculateBoundingBox(this.points);

    addShape(currentShape.current);
    clearCanvas();
    currentShape.current = undefined;
  }

  updateBoundingBox() {
    this.boundingBox = calculateBoundingBox(this.points);
  }
}

export default Circle;