import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import reducer, { action, actions, initialState } from "./reducer";
import { StateContext } from "../StateContextProvider";
import { MODES } from "../StateContextProvider/constants";

export const ShapesContext = createContext({});

const {
  ADD_SHAPE,
  POP_SHAPE,
  REMOVE_SHAPE_BY_ID,
  ADD_HISTORICAL_SHAPE,
  POP_HISTORICAL_SHAPE,
  CLEAR_SHAPES,
  CLEAR_HISTORICAL_SHAPES,
} = actions;

const ShapesContextProvider = ({ children }) => {
  const { setMode } = useContext(StateContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchAction = useCallback(
    (type, data) => dispatch(action(type, data)),
    [dispatch]
  );
  const addShape = useCallback(
    (shape) => {
      dispatchAction(ADD_SHAPE, shape);
      setMode(MODES.INTERACT);
    },
    [dispatchAction, setMode]
  );
  const popShape = useCallback(
    () => dispatchAction(POP_SHAPE),
    [dispatchAction]
  );
  const removeShapeById = useCallback(
    (id) => dispatchAction(REMOVE_SHAPE_BY_ID, id),
    [dispatchAction]
  );
  const addHistoricalShape = useCallback(
    (historicalShape) => dispatchAction(ADD_HISTORICAL_SHAPE, historicalShape),
    [dispatchAction]
  );
  const popHistoricalShape = useCallback(
    () => dispatchAction(POP_HISTORICAL_SHAPE),
    [dispatchAction]
  );
  const clearShapes = useCallback(
    () => dispatchAction(CLEAR_SHAPES),
    [dispatchAction]
  );
  const clearHistoricalShapes = useCallback(
    () => dispatchAction(CLEAR_HISTORICAL_SHAPES),
    [dispatchAction]
  );

  const value = useMemo(
    () => ({
      state,
      addShape,
      popShape,
      removeShapeById,
      addHistoricalShape,
      popHistoricalShape,
      clearShapes,
      clearHistoricalShapes,
    }),
    [state, dispatch]
  );

  return (
    <ShapesContext.Provider value={value}>{children}</ShapesContext.Provider>
  );
};

export default ShapesContextProvider;
