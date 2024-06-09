import { useCallback, useContext } from "react"
import { StateContext } from "../StateContextProvider";

const useCanvasManagement = (canvas, context) => {
  const { state } = useContext(StateContext);

  const { boundingBox } = state;

  const clearCanvas = useCallback(() => {
    if (boundingBox) {
      context.clearRect(boundingBox.bottomLeft.x, boundingBox.topRight.y, Math.abs(boundingBox.bottomLeft.x - boundingBox.topRight.x), Math.abs(boundingBox.bottomLeft.y - boundingBox.topRight.y));
    }
    else {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
    context.beginPath();
  }, [canvas, context, boundingBox]);

  return { clearCanvas };
}

export default useCanvasManagement;