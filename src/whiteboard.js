/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// @ts-nocheck

const MOUSE_STATES = {
  DOWN: 'DOWN',
  UP: 'UP'
}

class Whiteboard {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;

    this.context.lineWidth = 2;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
  }

  initiateCanvas() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.resizeCanvas();
  }

  initiateCanvasEventListeners() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.mouseState = MOUSE_STATES.DOWN;
      this.previousPoint = { x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop }
    });

    this.canvas.addEventListener('mouseup', (e) => {
      this.mouseState = MOUSE_STATES.UP;
      this.previousPoint = undefined;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.mouseState === MOUSE_STATES.UP) {
        return;
      }

      if (!this.previousPoint) {
        return;
      }

      this.draw(e);
    });

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  draw(e) {
    const newPoint = { x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop }

    this.context.moveTo(this.previousPoint.x, this.previousPoint.y);

    this.context.lineTo(newPoint.x, newPoint.y);

    this.context.stroke();

    this.previousPoint = newPoint;
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
  }
}