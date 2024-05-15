import { useContext } from "react";
import { MODES } from "../../components/StateContextProvider/constants";
import { StateContext } from "../../components/StateContextProvider";
import useInteractEventHandlers from "./useInteractEventHandlers";
import useDrawEventHandlers from "./useDrawEventHandlers";

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