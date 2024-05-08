import Arrow from "../../common/shapes/arrow";
import Circle from "../../common/shapes/circle";
import Pencil from "../../common/shapes/pencil";
import Rectangle from "../../common/shapes/rectangle";
import Text from "../../common/shapes/text";

export const resolvePencilEventListeners = (strokeWidth, strokeColor) => {
  const onMouseDown = (event, canvas, context, currentShape, clearCanvas) => {
    const initialPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };

    currentShape.current = new Pencil([initialPoint], strokeWidth, strokeColor);
  }

  const onMouseMove = (event, canvas, context, currentShape) => {
    currentShape.current.drawOngoing(event, canvas, context)
  }

  const onMouseUp = (event, canvas, currentShape) => {
    currentShape.current.points.push({ x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop });
  }

  return { onMouseDown, onMouseMove, onMouseUp }
}

export const resolveRectangleEventListeners = (strokeWidth, strokeColor) => {
  const onMouseDown = (event, canvas, context, currentShape, clearCanvas) => {
    const initialPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };

    currentShape.current = new Rectangle([initialPoint], strokeWidth, strokeColor);
  }

  const onMouseMove = (event, canvas, context, currentShape, clearCanvas) => {
    currentShape.current.drawOngoing(event, canvas, context, clearCanvas)
  }

  const onMouseUp = (event, canvas, currentShape) => {
    currentShape.current.points.push({ x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop });
  }

  return { onMouseDown, onMouseMove, onMouseUp }
}

export const resolveCircleEventListeners = (strokeWidth, strokeColor) => {
  const onMouseDown = (event, canvas, context, currentShape, clearCanvas) => {
    const initialPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };

    currentShape.current = new Circle([initialPoint], strokeWidth, strokeColor);
  }

  const onMouseMove = (event, canvas, context, currentShape, clearCanvas) => {
    currentShape.current.drawOngoing(event, canvas, context, clearCanvas)
  }

  const onMouseUp = (event, canvas, currentShape) => {
    currentShape.current.points.push({ x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop });
  }

  return { onMouseDown, onMouseMove, onMouseUp }
}

export const resolveArrowEventListeners = (strokeWidth, strokeColor) => {
  const onMouseDown = (event, canvas, context, currentShape, clearCanvas) => {
    const initialPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };

    currentShape.current = new Arrow([initialPoint], strokeWidth, strokeColor);
  }

  const onMouseMove = (event, canvas, context, currentShape, clearCanvas) => {
    currentShape.current.drawOngoing(event, canvas, context, clearCanvas)
  }

  const onMouseUp = (event, canvas, currentShape) => {
    currentShape.current.points.push({ x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop });
  }

  return { onMouseDown, onMouseMove, onMouseUp }
}

export const resolveTextEventListeners = (textSize, textColor) => {
  const onMouseDown = (event, canvas, context, currentShape, clearCanvas) => {
    if (currentShape.current) return;

    canvas.tabIndex = 1;

    const initialPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };

    currentShape.current = new Text(initialPoint, `${textSize}px Arial`, textColor);
    currentShape.current.indicateTyping(context, clearCanvas);
  }

  const onKeyDown = (event, canvas, context, currentShape, clearCanvas) => {
    if (event.key === "Escape") {
      canvas.tabIndex = 0;

      currentShape.current.removeTypingIndicator();
      currentShape.current = undefined;
      return;
    }

    currentShape.current.drawOngoing(event, canvas, context, clearCanvas)
  }

  return { onMouseDown, onKeyDown }
}