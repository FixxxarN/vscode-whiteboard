import Shape from "../shape.js";

class Rectangle extends Shape {
  constructor(points, strokeWidth) {
    super(points, strokeWidth);
  }

  draw(context) {
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

  drawOngoing(event, canvas, context, clearDynamicCanvas) {
    clearDynamicCanvas();

    context.lineWidth = this.strokeWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    const startingX = this.points[0].x;
    const startingY = this.points[0].y;

    const newPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop }

    context.rect(startingX, startingY, newPoint.x - startingX, newPoint.y - startingY);
    context.stroke();
  }
}

export default Rectangle;