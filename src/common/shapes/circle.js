import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";
import { calculateBoundingBox, calculateMouseCoordinateWithScale } from "../utils";
import Shape from "./shape";

class Circle extends Shape {
  constructor(points, strokeWidth, strokeColor) {
    super();
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

  onMouseMove({ event, canvas, context, clearCanvas, scale, origin }) {
    clearCanvas();

    context.strokeStyle = this.strokeColor;
    context.lineWidth = this.strokeWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    const startingX = this.points[0].x;
    const startingY = this.points[0].y;

    const newPoint = calculateMouseCoordinateWithScale(event, canvas, scale, origin);

    context.arc(startingX + ((newPoint.x - startingX) / 2), startingY + ((newPoint.y - startingY) / 2), Math.abs((newPoint.x - startingX) / 2), 0, 2 * Math.PI);
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
    this.updateBoundingBox();

    addShape(currentShape.current);
    clearCanvas();
    currentShape.current = undefined;
  }

  updateBoundingBox() {
    const startingPoint = this.points[0];
    const endingPoint = this.points[1];

    const centerPoint = { x: startingPoint.x + ((endingPoint.x - startingPoint.x) / 2), y: startingPoint.y + ((endingPoint.y - startingPoint.y) / 2) }
    const radius = Math.abs((endingPoint.x - startingPoint.x) / 2);

    const boundingBoxPoints = [{ x: centerPoint.x - radius, y: centerPoint.y - radius }, { x: centerPoint.x + radius, y: centerPoint.y + radius }];

    this.boundingBox = calculateBoundingBox(boundingBoxPoints);
  }
}

export default Circle;