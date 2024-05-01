import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";
import { resolveArrowEventListeners, resolveCircleEventListeners, resolvePencilEventListeners, resolveRectangleEventListeners } from "./utils";

const useEventListeners = (currentShapeType) => {
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
    default: {
      return {}
    }
  }
};

export default useEventListeners;