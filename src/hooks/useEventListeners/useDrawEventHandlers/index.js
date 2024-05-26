import { useContext, useEffect, useRef } from "react";
import useCanvasManagement from "../../../components/Canvases/useCanvasManagement";
import { ShapesContext } from "../../../components/ShapesContextProvider";
import { getDrawEventHandlers } from "./utils";
import { SHAPE_TYPES } from "../../../components/StateContextProvider/constants";

const useDrawEventHandlers = (canvas, context, state) => {
  const { clearCanvas } = useCanvasManagement(canvas, context);
  const { addShape } = useContext(ShapesContext);
  const { mode, currentShapeType } = state;

  const currentShape = useRef(undefined);

  useEffect(() => {
    if (currentShape.current) {
      if (currentShape.current.type === SHAPE_TYPES.TEXT) {
        currentShape.current.removeTypingIndicator(context, clearCanvas);
      }
      currentShape.current = undefined;
      clearCanvas();
    }
  }, [mode, currentShapeType])

  return getDrawEventHandlers({ canvas, context, currentShape, state, addShape, clearCanvas });
}

export default useDrawEventHandlers;