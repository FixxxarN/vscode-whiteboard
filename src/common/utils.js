export const calculateBoundingBox = (points) => {
  const arrayOfXCoordinates = points.map((point) => point.x);
  const arrayOfYCoordinates = points.map((point) => point.y);

  const bottomLeft = { x: Math.min(...arrayOfXCoordinates), y: Math.max(...arrayOfYCoordinates) }
  const topRight = { x: Math.max(...arrayOfXCoordinates), y: Math.min(...arrayOfYCoordinates) }

  return { bottomLeft, topRight }
}

export const calculateMouseCoordinateWithScale = (event, canvas, scale, origin) => {
  const rect = canvas.getBoundingClientRect();

  const mouseX = (event.clientX - rect.left) * window.devicePixelRatio;
  const mouseY = (event.clientY - rect.top) * window.devicePixelRatio;

  const worldX = (mouseX - origin.x) / scale;
  const worldY = (mouseY - origin.y) / scale;

  return { x: worldX, y: worldY }
}

export const throttle = (func, delay) => {
  let time = Date.now();
  return (...args) => {
    if ((time + delay - Date.now()) <= 0) {
      func.apply(this, args);
      time = Date.now();
    }
  }
}