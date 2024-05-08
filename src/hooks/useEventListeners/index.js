import { useContext } from "react";
import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";
import { resolveArrowEventListeners, resolveCircleEventListeners, resolvePencilEventListeners, resolveRectangleEventListeners, resolveTextEventListeners } from "./utils";
import { StateContext } from "../../components/StateContextProvider";

const useEventListeners = (currentShapeType) => {
  const { textSize, textColor, strokeWidth, strokeColor } = useContext(StateContext);

  switch (currentShapeType) {
    case SHAPE_TYPES.PENCIL: {
      return resolvePencilEventListeners(strokeWidth, strokeColor);
    }
    case SHAPE_TYPES.RECTANGLE: {
      return resolveRectangleEventListeners(strokeWidth, strokeColor);
    }
    case SHAPE_TYPES.CIRCLE: {
      return resolveCircleEventListeners(strokeWidth, strokeColor);
    }
    case SHAPE_TYPES.ARROW: {
      return resolveArrowEventListeners(strokeWidth, strokeColor);
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