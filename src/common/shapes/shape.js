class Shape {
  constructor() {

  }

  drawBorder(context) {
    context.beginPath();
    context.strokeStyle = 'lightblue';
    context.lineWidth = 1;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    const startingX = this.boundingBox.bottomLeft.x - 1;
    const startingY = this.boundingBox.bottomLeft.y + 1;

    const endingX = this.boundingBox.topRight.x + 1;
    const endingY = this.boundingBox.topRight.y - 1;

    context.rect(startingX, startingY, endingX - startingX, endingY - startingY);
    context.stroke();
  }
}

export default Shape;