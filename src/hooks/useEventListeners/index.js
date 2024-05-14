import { useContext, useRef } from "react";
import { MODES, SHAPE_TYPES } from "../../components/StateContextProvider/constants";
import { getDrawEventHandlers, getInteraceEventHandlers, resolveArrowEventListeners, resolveCircleEventListeners, resolvePencilEventListeners, resolveRectangleEventListeners, resolveTextEventListeners } from "./utils";
import { StateContext } from "../../components/StateContextProvider";
import { ShapesContext } from "../../components/ShapesContextProvider";
import useCanvasManagement from "../../components/Canvases/useCanvasManagement";

const useInteractEventHandlers = () => {
  return getInteraceEventHandlers();
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

  const interactEventHandlers = useInteractEventHandlers();
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