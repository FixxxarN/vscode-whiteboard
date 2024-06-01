import { useCallback, useContext, useEffect } from "react";
import useCanvasManagement from "../../components/Canvases/useCanvasManagement";
import { drawBackground } from "./utils";
import { ShapesContext } from "../../components/ShapesContextProvider";
import { StateContext } from "../../components/StateContextProvider";

const useDrawShapes = (canvas, context) => {
  const { clearCanvas } = useCanvasManagement(canvas, context);
  const { state: { shapes } } = useContext(ShapesContext);
  const { state: { scale, origin } } = useContext(StateContext);

  const redrawCanvas = useCallback((canvas, context, scale, origin) => {
    clearCanvas();
    drawBackground(canvas, context);

    context.save();

    context.translate(origin.x, origin.y);
    context.scale(scale, scale)

    shapes.forEach((shape) => {
      context.beginPath();
      shape.draw(context);
    });

    context.restore();
  }, [shapes, clearCanvas, drawBackground]);

  useEffect(() => {
    if (canvas && context) {
      redrawCanvas(canvas, context, scale, origin);

      window.addEventListener('resize', () => {
        redrawCanvas(canvas, context, scale, origin);
      });
    }
  }, [shapes, canvas, context, scale, origin]);
};

export default useDrawShapes;