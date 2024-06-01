import { useContext, useRef } from "react";
import useCanvasManagement from "../../../components/Canvases/useCanvasManagement";
import { ShapesContext } from "../../../components/ShapesContextProvider";
import { getInteraceEventHandlers } from "./utils";
import { StateContext } from "../../../components/StateContextProvider";

const useInteractEventHandlers = (canvas, context) => {
  const { clearCanvas } = useCanvasManagement(canvas, context);
  const { state, addShape, removeShapeById } = useContext(ShapesContext);
  const { state: { scale, origin } } = useContext(StateContext)
  const { shapes } = state;

  const hoveredShape = useRef(undefined);
  const hoveredShapePoints = useRef(undefined);
  const mouseDownPosition = useRef(undefined);
  const mouseDown = useRef(false);

  return getInteraceEventHandlers({ canvas, context, shapes, hoveredShape, mouseDownPosition, hoveredShapePoints, mouseDown, removeShapeById, addShape, clearCanvas, scale, origin });
}

export default useInteractEventHandlers;