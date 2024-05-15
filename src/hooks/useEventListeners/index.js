import { useContext, useRef } from "react";
import { MODES, SHAPE_TYPES } from "../../components/StateContextProvider/constants";
import { getDrawEventHandlers, getInteraceEventHandlers, resolveArrowEventListeners, resolveCircleEventListeners, resolvePencilEventListeners, resolveRectangleEventListeners, resolveTextEventListeners } from "./utils";
import { StateContext } from "../../components/StateContextProvider";
import { ShapesContext } from "../../components/ShapesContextProvider";
import useCanvasManagement from "../../components/Canvases/useCanvasManagement";

const useInteractEventHandlers = (canvas, context) => {
  const { clearCanvas } = useCanvasManagement(canvas, context);
  const { state, addShape, removeShapeById } = useContext(ShapesContext);
  const { shapes } = state;

  const hoveredShape = useRef(undefined);
  const hoveredShapePoints = useRef(undefined);
  const mouseDownPosition = useRef(undefined);
  const mouseDown = useRef(false);

  return getInteraceEventHandlers({ canvas, context, shapes, hoveredShape, mouseDownPosition, hoveredShapePoints, mouseDown, removeShapeById, addShape, clearCanvas });
}

const useDrawEventHandlers = (canvas, context, state) => {
  const { clearCanvas } = useCanvasManagement(canvas, context);
  const { addShape } = useContext(ShapesContext);

  const currentShape = useRef(undefined);

  return getDrawEventHandlers({ canvas, context, currentShape, state, addShape, clearCanvas });
}

const useEventListeners = (canvas, context) => {
  const { state } = useContext(StateContext);
  const { mode } = state;

  const interactEventHandlers = useInteractEventHandlers(canvas, context);
  const drawEventHandlers = useDrawEventHandlers(canvas, context, state);


  switch (mode) {
    case MODES.INTERACT: {
      return interactEventHandlers;
    }
    case MODES.DRAW: {
      return drawEventHandlers;
    }
    default: {
      return {}
    }
  }
};

export default useEventListeners;