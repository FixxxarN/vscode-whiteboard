import Arrow from "../../common/shapes/arrow";
import Circle from "../../common/shapes/circle";
import Pencil from "../../common/shapes/pencil";
import Rectangle from "../../common/shapes/rectangle";

export const resolvePencilEventListeners = () => {
  const onMouseDown = (event, canvas, currentShape) => {
    const initialPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };

    currentShape.current = new Pencil([initialPoint], 1, '#000');
  }

  const onMouseMove = (event, canvas, context, currentShape) => {
    currentShape.current.drawOngoing(event, canvas, context)
  }

  const onMouseUp = (event, canvas, currentShape) => {
    currentShape.current.points.push({ x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop });
  }

  return { onMouseDown, onMouseMove, onMouseUp }
}

export const resolveRectangleEventListeners = () => {
  const onMouseDown = (event, canvas, currentShape) => {
    const initialPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };

    currentShape.current = new Rectangle([initialPoint], 1, '#000');
  }

  const onMouseMove = (event, canvas, context, currentShape, clearCanvas) => {
    currentShape.current.drawOngoing(event, canvas, context, clearCanvas)
  }

  const onMouseUp = (event, canvas, currentShape) => {
    currentShape.current.points.push({ x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop });
  }

  return { onMouseDown, onMouseMove, onMouseUp }
}

export const resolveCircleEventListeners = () => {
  const onMouseDown = (event, canvas, currentShape) => {
    const initialPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };

    currentShape.current = new Circle([initialPoint], 1, '#000');
  }

  const onMouseMove = (event, canvas, context, currentShape, clearCanvas) => {
    currentShape.current.drawOngoing(event, canvas, context, clearCanvas)
  }

  const onMouseUp = (event, canvas, currentShape) => {
    currentShape.current.points.push({ x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop });
  }

  return { onMouseDown, onMouseMove, onMouseUp }
}

export const resolveArrowEventListeners = () => {
  const onMouseDown = (event, canvas, currentShape) => {
    const initialPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };

    currentShape.current = new Arrow([initialPoint], 1, '#000');
  }

  const onMouseMove = (event, canvas, context, currentShape, clearCanvas) => {
    currentShape.current.drawOngoing(event, canvas, context, clearCanvas)
  }

  const onMouseUp = (event, canvas, currentShape) => {
    currentShape.current.points.push({ x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop });
  }

  return { onMouseDown, onMouseMove, onMouseUp }
}