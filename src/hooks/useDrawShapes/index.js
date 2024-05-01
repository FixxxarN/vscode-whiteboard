import { useCallback, useContext, useEffect } from "react";
import useCanvasManagement from "../../components/canvases/useCanvasManagement";
import { StateContext } from "../../components/StateContextProvider";
import { drawBackground } from "./utils";

const useDrawShapes = (canvas, context) => {
  const { clearCanvas } = useCanvasManagement(canvas, context);
  const { shapes } = useContext(StateContext);

  const redrawCanvas = useCallback((shapes, canvas, context) => {
    clearCanvas();
    drawBackground(canvas, context);

    shapes.forEach((shape) => {
      context.beginPath();
      shape.draw(context);
    });
  }, [clearCanvas, drawBackground]);

  useEffect(() => {
    if (canvas && context) {
      redrawCanvas(shapes, canvas, context);

      window.addEventListener('resize', () => {
        redrawCanvas(shapes, canvas, context);
      });
    }
  }, [shapes, canvas, context]);
};

export default useDrawShapes;