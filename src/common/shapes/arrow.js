import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";

class Arrow {
  constructor(initialPoint, strokeWidth, strokeColor) {
    this.points = [initialPoint];
    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;

    this.type = SHAPE_TYPES.ARROW;
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

  drawOngoing(event, canvas, context, clearCanvas) {
    clearCanvas();

    context.strokeStyle = this.strokeColor;
    context.lineWidth = this.strokeWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    const startingX = this.points[0].x;
    const startingY = this.points[0].y;

    const newPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop }

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
}

export default Arrow;