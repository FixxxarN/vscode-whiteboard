import { useCallback, useContext, useEffect } from "react";
import useCanvasManagement from "../../components/canvases/useCanvasManagement";
import { drawBackground } from "./utils";
import { ShapesContext } from "../../components/ShapesContextProvider";

const useDrawShapes = (canvas, context) => {
  const { clearCanvas } = useCanvasManagement(canvas, context);
  const { shapes } = useContext(ShapesContext);

  const redrawCanvas = useCallback((shapes, canvas, context) => {
    clearCanvas();
    drawBackground(canvas, context);

    shapes.forEach((shape) => {
      context.beginPath();
      shape.draw(context);
    });
  }, [clearCanvas, drawBackground]);

  useEffect(() => {
    if (canvas && context && shapes.length > 0) {
      redrawCanvas(shapes, canvas, context);

      window.addEventListener('resize', () => {
        redrawCanvas(shapes, canvas, context);
      });
    }
  }, [shapes, canvas, context]);
};

export default useDrawShapes;