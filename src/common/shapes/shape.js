class Shape {
  constructor() {

  }

  drawBorder(context, strokeWidth) {
    context.beginPath();
    context.strokeStyle = 'lightblue';
    context.lineWidth = 1;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    const startingX = this.boundingBox.bottomLeft.x - strokeWidth / 2;
    const startingY = this.boundingBox.bottomLeft.y + strokeWidth / 2;

    const endingX = this.boundingBox.topRight.x + strokeWidth / 2;
    const endingY = this.boundingBox.topRight.y - strokeWidth / 2;

    context.rect(startingX, startingY, endingX - startingX, endingY - startingY);
    context.stroke();
  }
}

export default Shape;