import Arrow from "../../common/shapes/arrow";
import Circle from "../../common/shapes/circle";
import Pencil from "../../common/shapes/pencil";
import Rectangle from "../../common/shapes/rectangle";
import Text from "../../common/shapes/text";
import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";

export const getInteraceEventHandlers = ({ canvas, context, shapes, hoveredShape, mouseDownPosition, hoveredShapePoints, mouseDown, removeShapeById, addShape, clearCanvas }) => {
  const onMouseDown = (event) => {
    if (hoveredShape.current) {
      mouseDown.current = true;
      hoveredShapePoints.current = hoveredShape.current.points;
      mouseDownPosition.current = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };
    }
  }

  const onMouseMove = (event) => {
    const mousePosition = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };

    if (mouseDown.current) {
      if (hoveredShape.current?.id) {
        removeShapeById(hoveredShape.current.id);
      }
      const mouseDiff = { x: mouseDownPosition.current.x - mousePosition.x, y: mouseDownPosition.current.y - mousePosition.y };
      const changedPoints = hoveredShapePoints.current.map((point) => ({
        x: point.x - mouseDiff.x,
        y: point.y - mouseDiff.y
      }));
      hoveredShape.current.move(changedPoints, context, clearCanvas)
    }
    else {
      for (let i = 0; i < shapes.length; i++) {
        if (
          mousePosition.x >= shapes[i].boundingBox.bottomLeft.x &&
          mousePosition.y <= shapes[i].boundingBox.bottomLeft.y &&
          mousePosition.x <= shapes[i].boundingBox.topRight.x &&
          mousePosition.y >= shapes[i].boundingBox.topRight.y
        ) {
          if (hoveredShape.current?.id === shapes[i].id) return;
          document.getElementById('dynamic-canvas').style.cursor = 'move'
          hoveredShape.current = shapes[i];
          break;
        }
        else {
          document.getElementById('dynamic-canvas').style.cursor = 'default'
          hoveredShape.current = undefined;
        }
      }
    }
  }

  const onMouseUp = (event) => {
    hoveredShape.current.updateBoundingBox(context);
    addShape(hoveredShape.current);
    clearCanvas();
    hoveredShape.current = undefined;
    mouseDown.current = false;
  }

  return { onMouseDown, onMouseMove, onMouseUp }
}

export const getDrawEventHandlers = ({ canvas, context, currentShape, state, addShape, clearCanvas }) => {
  const { strokeWidth, strokeColor, textSize, textColor } = state;

  const onMouseDown = (event) => {
    const initialPoint = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };

    switch (state.currentShapeType) {
      case SHAPE_TYPES.PENCIL: {
        currentShape.current = new Pencil([initialPoint], strokeWidth, strokeColor);
        break;
      }
      case SHAPE_TYPES.RECTANGLE: {
        currentShape.current = new Rectangle([initialPoint], strokeWidth, strokeColor);
        break;
      }
      case SHAPE_TYPES.CIRCLE: {
        currentShape.current = new Circle([initialPoint], strokeWidth, strokeColor);
        break;
      }
      case SHAPE_TYPES.ARROW: {
        currentShape.current = new Arrow([initialPoint], strokeWidth, strokeColor);
        break;
      }
      case SHAPE_TYPES.TEXT: {
        if (currentShape.current) {
          canvas.tabIndex = 0;

          addShape(currentShape.current);
          currentShape.current.removeTypingIndicator(context, clearCanvas);
          currentShape.current = undefined;
          return;
        }

        canvas.tabIndex = 1;
        currentShape.current = new Text(initialPoint, `${textSize}px Arial`, textColor);
        currentShape.current.indicateTyping(context, clearCanvas);
        break;
      }
    }
  }

  const onMouseMove = (event) => {
    if (!currentShape.current) return;

    if (currentShape.current?.onMouseMove) {
      currentShape.current.onMouseMove(event, canvas, context, clearCanvas)
    }
  }

  const onMouseUp = (event) => {
    if (currentShape.current?.onMouseUp) {
      currentShape.current.onMouseUp(event, canvas, context, currentShape, addShape, clearCanvas)
    }
  }

  const onKeyDown = (event) => {
    if (currentShape.current?.onKeyDown) {
      currentShape.current.onKeyDown(event, canvas, context, currentShape, addShape, clearCanvas)
    }
  }

  return { onMouseDown, onMouseMove, onMouseUp, onKeyDown }
}