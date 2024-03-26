/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// @ts-nocheck

const MOUSE_STATES = {
  DOWN: 'DOWN',
  UP: 'UP'
}

const SHAPE_TYPES = {
  LINE: 'LINE'
}

class Whiteboard {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;

    this.context.lineWidth = 2;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';

    this.shapes = [];
  }

  initiateCanvas() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.resizeCanvas();
  }

  initiateCanvasEventListeners() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.mouseState = MOUSE_STATES.DOWN;
      this.currentShape = {
        type: SHAPE_TYPES.LINE,
        points: [{ x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop }],
      }
    });

    this.canvas.addEventListener('mouseup', (e) => {
      this.mouseState = MOUSE_STATES.UP;
      this.shapes.push(this.currentShape);
      this.currentShape = undefined;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.mouseState === MOUSE_STATES.UP) {
        return;
      }

      if (!this.currentShape) {
        return;
      }

      this.draw(e);
    });

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  draw(e) {
    this.context.moveTo(this.currentShape.points[this.currentShape.points.length - 1].x, this.currentShape.points[this.currentShape.points.length - 1].y);

    const newPoint = { x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop }
    this.context.lineTo(newPoint.x, newPoint.y);

    this.context.stroke();

    this.currentShape.points.push(newPoint);
  }

  export() {
    const downloadLink = document.createElement('a');

    this.canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);

      downloadLink.setAttribute('download', 'whiteboard.png');
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
  }

  clearCanvas() {
    this.shapes = [];
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
  }

  resizeCanvas() {
    this.context.canvas.height = window.innerHeight;
    this.context.canvas.width = window.innerWidth;

    this.scaleCanvas();
  }

  scaleCanvas() {
    const scale = window.devicePixelRatio;

    this.canvas.height = Math.floor(window.innerHeight * scale);
    this.canvas.width = Math.floor(window.innerWidth * scale);

    this.context.scale(scale, scale);

    this.redrawCanvas();
  }

  redrawCanvas() {
    this.shapes.forEach((shape) => {
      switch (shape.type) {
        case SHAPE_TYPES.LINE: {
          this.drawLine(shape.points);
        }
      }
    })
  }

  drawLine(points) {
    points.forEach((point, i) => {
      if (!points[i + 1]) {
        return;
      }

      this.context.moveTo(point.x, point.y);

      this.context.lineTo(points[i + 1].x, points[i + 1].y);

      this.context.stroke();
    })
  }
}