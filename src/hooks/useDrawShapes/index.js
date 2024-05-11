import { useCallback, useContext, useEffect } from "react";
import useCanvasManagement from "../../components/Canvases/useCanvasManagement";
import { drawBackground } from "./utils";
import { ShapesContext } from "../../components/ShapesContextProvider";

const useDrawShapes = (canvas, context) => {
  const { clearCanvas } = useCanvasManagement(canvas, context);
  const { state: { shapes } } = useContext(ShapesContext);

  const redrawCanvas = useCallback((canvas, context) => {
    clearCanvas();
    drawBackground(canvas, context);

    shapes.forEach((shape) => {
      context.beginPath();
      shape.draw(context);
    });
  }, [shapes, clearCanvas, drawBackground]);

  useEffect(() => {
    if (canvas && context) {
      redrawCanvas(canvas, context);

      window.addEventListener('resize', () => {
        redrawCanvas(canvas, context);
      });
    }
  }, [shapes, canvas, context]);
};

export default useDrawShapes;