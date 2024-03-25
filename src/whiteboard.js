/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// @ts-nocheck

const MOUSE_STATES = {
  DOWN: 'DOWN',
  UP: 'UP'
}

class Whiteboard {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.context.lineWidth = 2;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
  }

  initiateCanvas() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
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
  }

  draw(e) {
    const newPoint = { x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop }

    this.context.moveTo(this.previousPoint.x, this.previousPoint.y);

    this.context.lineTo(newPoint.x, newPoint.y);

    this.context.stroke();

    this.previousPoint = newPoint;
  }
}