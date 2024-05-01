import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../../StateContextProvider/index.jsx";
import { MODES } from "../../StateContextProvider/constants.js";
import { Canvas } from "./styles.js";
import useEventListeners from "../../../hooks/useEventListeners/index.js";
import useResizeAndScale from "../useResizeAndScale.js";
import useCanvasManagement from "../useCanvasManagement.js";
import { ShapesContext } from "../../ShapesContextProvider/index.jsx";

const DynamicCanvas = () => {
  const [canvas, setCanvas] = useState(undefined);
  const [context, setContext] = useState(undefined);

  const { mode, currentShapeType } = useContext(StateContext);
  const { addShape } = useContext(ShapesContext);

  const currentShape = useRef(undefined);

  useResizeAndScale(canvas, context);
  const { clearCanvas } = useCanvasManagement(canvas, context);

  const refCallback = useCallback((canvas) => {
    setCanvas(canvas);
    setContext(canvas.getContext("2d"));
  }, []);

  const { onMouseDown, onMouseMove, onMouseUp } =
    useEventListeners(currentShapeType);

  if (mode !== MODES.DRAW) {
    return null;
  }

  return (
    <Canvas
      onMouseDown={(event) => onMouseDown(event, canvas, currentShape)}
      onMouseMove={(event) => {
        if (currentShape.current && currentShape.current.points) {
          onMouseMove(event, canvas, context, currentShape, clearCanvas);
        }
      }}
      onMouseUp={(event) => {
        onMouseUp(event, canvas, currentShape);
        addShape(currentShape.current);
        currentShape.current = undefined;
        clearCanvas();
      }}
      ref={refCallback}
    />
  );
};

export default DynamicCanvas;
