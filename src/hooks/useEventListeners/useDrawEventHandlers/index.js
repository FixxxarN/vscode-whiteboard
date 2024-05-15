import { useContext, useRef } from "react";
import useCanvasManagement from "../../../components/Canvases/useCanvasManagement";
import { ShapesContext } from "../../../components/ShapesContextProvider";
import { getDrawEventHandlers } from "./utils";

const useDrawEventHandlers = (canvas, context, state) => {
  const { clearCanvas } = useCanvasManagement(canvas, context);
  const { addShape } = useContext(ShapesContext);

  const currentShape = useRef(undefined);

  return getDrawEventHandlers({ canvas, context, currentShape, state, addShape, clearCanvas });
}

export default useDrawEventHandlers;