import Shape from "../shape.js";

class Circle extends Shape {
  constructor(points) {
    super(points);
  }

  draw(context) {
    const startingX = this.points[0].x;
    const startingY = this.points[0].y;

    const endingX = this.points[1].x;
    const endingY = this.points[1].y;

    context.arc(startingX + ((endingX - startingX) / 2), startingY + ((endingY - startingY) / 2), Math.abs((endingX - startingX) / 2), 0, 2 * Math.PI);
    context.stroke();
  }

  drawOngoing(event, canvas, context, clearDynamicCanvas) {
    clearDynamicCanvas();

    const startingX = this.points[0].x;
    const startingY = this.points[0].y;

    const newPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop }

    context.arc(startingX + ((newPoint.x - startingX) / 2), startingY + ((newPoint.y - startingY) / 2), Math.abs((newPoint.x - startingX) / 2), 0, 2 * Math.PI);
    context.stroke();
  }
}

export default Circle;