import Shape from "../shape.js";

class Pencil extends Shape {
  constructor(points) {
    super(points);
  }

  draw(context) {
    this.points.forEach((point, i) => {
      if (!this.points[i + 1]) {
        return;
      }

      context.moveTo(point.x, point.y);

      context.lineTo(this.points[i + 1].x, this.points[i + 1].y);

      context.stroke();
    })
  }

  drawOngoing(event, canvas, context) {
    context.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);

    const newPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop }

    context.lineTo(newPoint.x, newPoint.y);

    context.stroke();

    this.points.push(newPoint);
  }
}

export default Pencil;