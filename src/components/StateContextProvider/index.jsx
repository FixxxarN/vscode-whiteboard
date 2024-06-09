import { createContext, useCallback, useMemo, useReducer } from "react";
import reducer, { action, actions, initialState } from "./reducer";

export const StateContext = createContext({});

const {
  SET_MODE,
  SET_CURRENT_SHAPE_TYPE,
  SET_TEXT_SIZE,
  SET_TEXT_COLOR,
  SET_STROKE_WIDTH,
  SET_STROKE_COLOR,
  SET_SCALE,
  SET_ORIGIN,
  SET_BOUNDING_BOX,
} = actions;

const StateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchAction = useCallback(
    (type, data) => dispatch(action(type, data)),
    [dispatch]
  );
  const setMode = useCallback(
    (mode) => dispatchAction(SET_MODE, mode),
    [dispatchAction]
  );
  const setCurrentShapeType = useCallback(
    (shapeType) => dispatchAction(SET_CURRENT_SHAPE_TYPE, shapeType),
    [dispatchAction]
  );
  const setTextSize = useCallback(
    (textSize) => dispatchAction(SET_TEXT_SIZE, textSize),
    [dispatchAction]
  );
  const setTextColor = useCallback(
    (textColor) => dispatchAction(SET_TEXT_COLOR, textColor),
    [dispatchAction]
  );
  const setStrokeWidth = useCallback(
    (strokeWidth) => dispatchAction(SET_STROKE_WIDTH, strokeWidth),
    [dispatchAction]
  );
  const setStrokeColor = useCallback(
    (strokeColor) => dispatchAction(SET_STROKE_COLOR, strokeColor),
    [dispatchAction]
  );
  const setScale = useCallback(
    (scale) => dispatchAction(SET_SCALE, scale),
    [dispatchAction]
  );
  const setOrigin = useCallback(
    (origin) => dispatchAction(SET_ORIGIN, origin),
    [dispatchAction]
  );
  const setBoundingBox = useCallback(
    (boundingBox) => dispatchAction(SET_BOUNDING_BOX, boundingBox),
    [dispatchAction]
  );

  const value = useMemo(
    () => ({
      state,
      setMode,
      setCurrentShapeType,
      setTextSize,
      setTextColor,
      setStrokeWidth,
      setStrokeColor,
      setScale,
      setOrigin,
      setBoundingBox,
    }),
    [state, dispatch]
  );

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateContextProvider;
