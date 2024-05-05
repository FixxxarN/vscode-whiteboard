import { useContext } from "react";
import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";
import { resolveArrowEventListeners, resolveCircleEventListeners, resolvePencilEventListeners, resolveRectangleEventListeners, resolveTextEventListeners } from "./utils";
import { StateContext } from "../../components/StateContextProvider";

const useEventListeners = (currentShapeType) => {
  const { textSize, textColor } = useContext(StateContext);

  switch (currentShapeType) {
    case SHAPE_TYPES.PENCIL: {
      return resolvePencilEventListeners();
    }
    case SHAPE_TYPES.RECTANGLE: {
      return resolveRectangleEventListeners();
    }
    case SHAPE_TYPES.CIRCLE: {
      return resolveCircleEventListeners();
    }
    case SHAPE_TYPES.ARROW: {
      return resolveArrowEventListeners();
    }
    case SHAPE_TYPES.TEXT: {
      return resolveTextEventListeners(textSize, textColor);
    }
    default: {
      return {}
    }
  }
};

export default useEventListeners;