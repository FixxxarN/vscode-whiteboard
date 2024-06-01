import Arrow from "../../../common/shapes/arrow";
import Circle from "../../../common/shapes/circle";
import Pencil from "../../../common/shapes/pencil";
import Rectangle from "../../../common/shapes/rectangle";
import Text from "../../../common/shapes/text";
import { calculateMouseCoordinateWithScale } from "../../../common/utils";
import { SHAPE_TYPES } from "../../../components/StateContextProvider/constants";

export const getDrawEventHandlers = ({ canvas, context, currentShape, state, addShape, clearCanvas }) => {
  const { strokeWidth, strokeColor, textSize, textColor, scale, origin } = state;

  const onMouseDown = (event) => {
    const { x, y } = calculateMouseCoordinateWithScale(event, canvas, scale, origin);

    const initialPoint = { x, y };

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
      currentShape.current.onMouseMove({ event, canvas, context, clearCanvas, scale, origin })
    }
  }

  const onMouseUp = (event) => {
    if (currentShape.current?.onMouseUp) {
      currentShape.current.onMouseUp({ event, canvas, context, currentShape, addShape, clearCanvas, scale, origin })
    }
  }

  const onKeyDown = (event) => {
    if (currentShape.current?.onKeyDown) {
      currentShape.current.onKeyDown({ event, canvas, context, currentShape, addShape, clearCanvas })
    }
  }

  return { onMouseDown, onMouseMove, onMouseUp, onKeyDown }
}