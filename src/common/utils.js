export const calculateBoundingBox = (points) => {
  const arrayOfXCoordinates = points.map((point) => point.x);
  const arrayOfYCoordinates = points.map((point) => point.y);

  const bottomLeft = { x: Math.min(...arrayOfXCoordinates), y: Math.max(...arrayOfYCoordinates) }
  const topRight = { x: Math.max(...arrayOfXCoordinates), y: Math.min(...arrayOfYCoordinates) }

  return { bottomLeft, topRight }
}