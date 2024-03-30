/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// @ts-nocheck

const MOUSE_STATES = {
  DOWN: 'DOWN',
  UP: 'UP'
}

const SHAPE_TYPES = {
  LINE: 'LINE',
  RECTANGLE: 'RECTANGLE',
  CIRCLE: 'CIRCLE'
}

class Whiteboard {
  constructor(staticCanvas, staticCanvasContext, dynamicCanvas, dynamicCanvasContext) {
    this.staticCanvas = staticCanvas;
    this.staticCanvasContext = staticCanvasContext;
    this.dynamicCanvas = dynamicCanvas;
    this.dynamicCanvasContext = dynamicCanvasContext;

    this.dynamicCanvasContext.lineWidth = 2;
    this.dynamicCanvasContext.lineCap = 'round';
    this.dynamicCanvasContext.lineJoin = 'round';

    this.staticCanvasContext.lineWidth = 2;
    this.staticCanvasContext.lineCap = 'round';
    this.staticCanvasContext.lineJoin = 'round';

    this.shapes = [];
    this.selectedShapeType = SHAPE_TYPES.LINE;
  }

  initiateCanvas() {
    this.staticCanvas.height = window.innerHeight;
    this.staticCanvas.width = window.innerWidth;

    this.dynamicCanvas.height = window.innerHeight;
    this.dynamicCanvas.width = window.innerWidth;

    this.resizeCanvas();
  }

  initiateCanvasEventListeners() {
    this.dynamicCanvas.addEventListener('mousedown', (e) => {
      this.mouseState = MOUSE_STATES.DOWN;
      this.currentShape = {
        type: this.selectedShapeType,
        points: [{ x: e.clientX - this.dynamicCanvas.offsetLeft, y: e.clientY - this.dynamicCanvas.offsetTop }],
      }
      this.dynamicCanvasContext.beginPath();
    });

    this.dynamicCanvas.addEventListener('mouseup', (e) => {
      this.mouseState = MOUSE_STATES.UP;
      this.handleMouseUp(e);
    });

    this.dynamicCanvas.addEventListener('mousemove', (e) => {
      if (this.mouseState === MOUSE_STATES.UP) {
        return;
      }

      if (!this.currentShape) {
        return;
      }

      this.handleMouseMove(e);
    });

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  handleMouseUp(e) {
    switch (this.selectedShapeType) {
      case SHAPE_TYPES.LINE: {
        break;
      }
      case SHAPE_TYPES.RECTANGLE: {
        this.currentShape.points.push({ x: e.clientX - this.dynamicCanvas.offsetLeft, y: e.clientY - this.dynamicCanvas.offsetTop });
        break;
      }
      case SHAPE_TYPES.CIRCLE: {
        this.currentShape.points.push({ x: e.clientX - this.dynamicCanvas.offsetLeft, y: e.clientY - this.dynamicCanvas.offsetTop });
        break;
      }
    }

    this.shapes.push(this.currentShape);
    this.currentShape = undefined;

    this.clearDynamicCanvas();
    this.redrawCanvas();
  }

  handleMouseMove(e) {
    switch (this.selectedShapeType) {
      case SHAPE_TYPES.LINE: {
        this.drawOngoingLine(e);
        break;
      }
      case SHAPE_TYPES.RECTANGLE: {
        this.drawOngoingRectangle(e);
        break;
      }
      case SHAPE_TYPES.CIRCLE: {
        this.drawOngoingCircle(e);
        break;
      }
    }
  }

  drawOngoingLine(e) {
    this.dynamicCanvasContext.moveTo(this.currentShape.points[this.currentShape.points.length - 1].x, this.currentShape.points[this.currentShape.points.length - 1].y);

    const newPoint = { x: e.clientX - this.dynamicCanvas.offsetLeft, y: e.clientY - this.dynamicCanvas.offsetTop }
    this.dynamicCanvasContext.lineTo(newPoint.x, newPoint.y);

    this.dynamicCanvasContext.stroke();

    this.currentShape.points.push(newPoint);
  }

  drawOngoingRectangle(e) {
    this.clearDynamicCanvas();

    const startingX = this.currentShape.points[0].x;
    const startingY = this.currentShape.points[0].y;

    const newPoint = { x: e.clientX - this.dynamicCanvas.offsetLeft, y: e.clientY - this.dynamicCanvas.offsetTop }

    this.dynamicCanvasContext.rect(startingX, startingY, newPoint.x - startingX, newPoint.y - startingY);
    this.dynamicCanvasContext.stroke();
  }

  drawOngoingCircle(e) {
    this.clearDynamicCanvas();

    const startingX = this.currentShape.points[0].x;
    const startingY = this.currentShape.points[0].y;

    const newPoint = { x: e.clientX - this.dynamicCanvas.offsetLeft, y: e.clientY - this.dynamicCanvas.offsetTop }

    this.dynamicCanvasContext.arc(startingX + ((newPoint.x - startingX) / 2), startingY + ((newPoint.y - startingY) / 2), Math.abs((newPoint.x - startingX) / 2), 0, 2 * Math.PI);
    this.dynamicCanvasContext.stroke();
  }

  export() {
    const downloadLink = document.createElement('a');

    this.staticCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);

      downloadLink.setAttribute('download', 'whiteboard.png');
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
  }

  clearShapes() {
    this.shapes = [];
  }

  clearStaticCanvas() {
    this.staticCanvasContext.clearRect(0, 0, this.staticCanvas.width, this.staticCanvas.height);
    this.staticCanvasContext.beginPath();
  }

  clearDynamicCanvas() {
    this.dynamicCanvasContext.clearRect(0, 0, this.dynamicCanvas.width, this.dynamicCanvas.height);
    this.dynamicCanvasContext.beginPath();
  }

  resizeCanvas() {
    this.staticCanvasContext.canvas.height = window.innerHeight;
    this.staticCanvasContext.canvas.width = window.innerWidth;

    this.dynamicCanvasContext.canvas.height = window.innerHeight;
    this.dynamicCanvasContext.canvas.width = window.innerWidth;

    this.scaleCanvas();
  }

  scaleCanvas() {
    const scale = window.devicePixelRatio;

    this.staticCanvas.height = Math.floor(window.innerHeight * scale);
    this.staticCanvas.width = Math.floor(window.innerWidth * scale);

    this.staticCanvasContext.scale(scale, scale);

    this.dynamicCanvas.height = Math.floor(window.innerHeight * scale);
    this.dynamicCanvas.width = Math.floor(window.innerWidth * scale);

    this.dynamicCanvasContext.scale(scale, scale);

    this.redrawCanvas();
  }

  redrawCanvas() {
    this.clearStaticCanvas();
    this.shapes.forEach((shape) => {
      switch (shape.type) {
        case SHAPE_TYPES.LINE: {
          this.drawLine(shape.points);
          break;
        }
        case SHAPE_TYPES.RECTANGLE: {
          this.drawRectangle(shape.points);
          break;
        }
        case SHAPE_TYPES.CIRCLE: {
          this.drawCircle(shape.points);
          break;
        }
      }
    })
  }

  drawLine(points) {
    this.staticCanvasContext.beginPath();
    points.forEach((point, i) => {
      if (!points[i + 1]) {
        return;
      }

      this.staticCanvasContext.moveTo(point.x, point.y);

      this.staticCanvasContext.lineTo(points[i + 1].x, points[i + 1].y);

      this.staticCanvasContext.stroke();
    })
  }

  drawRectangle(points) {
    this.staticCanvasContext.beginPath();
    const startingX = points[0].x;
    const startingY = points[0].y;

    const endingX = points[1].x;
    const endingY = points[1].y;

    this.staticCanvasContext.rect(startingX, startingY, endingX - startingX, endingY - startingY);
    this.staticCanvasContext.stroke();
  }

  drawCircle(points) {
    this.staticCanvasContext.beginPath();
    const startingX = points[0].x;
    const startingY = points[0].y;

    const endingX = points[1].x;
    const endingY = points[1].y;

    this.staticCanvasContext.arc(startingX + ((endingX - startingX) / 2), startingY + ((endingY - startingY) / 2), Math.abs((endingX - startingX) / 2), 0, 2 * Math.PI);
    this.staticCanvasContext.stroke();
  }

  setSelectedShapeType(shapeType) {
    if (SHAPE_TYPES[shapeType]) {
      this.selectedShapeType = SHAPE_TYPES[shapeType];
    }
  }
}

export default Whiteboard;