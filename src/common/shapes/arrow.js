import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";
import { calculateBoundingBox, calculateMouseCoordinateWithScale } from "../utils";
import Shape from "./shape";

class Arrow extends Shape {
  constructor(points, strokeWidth, strokeColor) {
    super();
    this.id = crypto.randomUUID();
    this.points = points;
    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;

    this.type = SHAPE_TYPES.ARROW;

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

    const { arrowPoint1, arrowPoint2 } = this.calculateArrowPoints(startingX, startingY, endingX, endingY);

    context.moveTo(startingX, startingY);
    context.lineTo(endingX, endingY);
    context.lineTo(arrowPoint1.x, arrowPoint1.y);
    context.moveTo(endingX, endingY);
    context.lineTo(arrowPoint2.x, arrowPoint2.y);
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

    const endingX = newPoint.x;
    const endingY = newPoint.y;

    const { arrowPoint1, arrowPoint2 } = this.calculateArrowPoints(startingX, startingY, endingX, endingY);


    context.moveTo(startingX, startingY);
    context.lineTo(endingX, endingY);
    context.lineTo(arrowPoint1.x, arrowPoint1.y);
    context.moveTo(endingX, endingY);
    context.lineTo(arrowPoint2.x, arrowPoint2.y);
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

  calculateArrowPoints(startingX, startingY, endingX, endingY) {
    const dx = endingX - startingX;
    const dy = endingY - startingY;

    const length = Math.sqrt(dx * dx + dy * dy);
    const unitDx = dx / length;
    const unitDy = dy / length;

    const arrowHeadSize = 5;

    const arrowPoint1 = { x: endingX - unitDx * arrowHeadSize - unitDy * arrowHeadSize, y: endingY - unitDy * arrowHeadSize + unitDx * arrowHeadSize };
    const arrowPoint2 = { x: endingX - unitDx * arrowHeadSize + unitDy * arrowHeadSize, y: endingY - unitDy * arrowHeadSize - unitDx * arrowHeadSize };

    return { arrowPoint1, arrowPoint2 };
  }

  updateBoundingBox() {
    this.boundingBox = calculateBoundingBox(this.points);
  }
}

export default Arrow;