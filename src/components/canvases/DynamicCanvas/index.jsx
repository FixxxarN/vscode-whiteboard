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
  const { addShape, clearHistoricalShapes } = useContext(ShapesContext);

  const currentShape = useRef(undefined);

  useResizeAndScale(canvas, context);
  const { clearCanvas } = useCanvasManagement(canvas, context);

  const refCallback = useCallback((canvas) => {
    setCanvas(canvas);
    setContext(canvas.getContext("2d"));
  }, []);

  const {
    onMouseDown = undefined,
    onMouseMove = undefined,
    onKeyDown = undefined,
    onMouseUp = undefined,
  } = useEventListeners(currentShapeType);

  if (mode !== MODES.DRAW) {
    return null;
  }

  return (
    <Canvas
      onMouseDown={(event) => {
        if (!onMouseDown) return;

        onMouseDown(event, canvas, context, currentShape, clearCanvas);
      }}
      onMouseMove={(event) => {
        if (!onMouseMove || !currentShape.current) return;

        if (currentShape.current && currentShape.current.points) {
          onMouseMove(event, canvas, context, currentShape, clearCanvas);
        }
      }}
      onMouseUp={(event) => {
        if (!onMouseUp || !currentShape.current) return;

        onMouseUp(event, canvas, currentShape);
        addShape(currentShape.current);
        clearHistoricalShapes();
        currentShape.current = undefined;
        clearCanvas();
      }}
      onKeyDown={(event) => {
        if (!onKeyDown || !currentShape.current) return;

        if (
          event.key === "Shift" ||
          event.key === "Alt" ||
          event.key === "Meta" ||
          event.key === "Control"
        ) {
          return;
        }

        if (event.key === "Escape") {
          addShape(currentShape.current);
          clearHistoricalShapes();
          clearCanvas();
        }

        onKeyDown(event, canvas, context, currentShape, clearCanvas);
      }}
      ref={refCallback}
    />
  );
};

export default DynamicCanvas;
