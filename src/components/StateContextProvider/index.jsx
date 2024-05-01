import { createContext, useState } from "react";
import { MODES } from "./constants";

export const StateContext = createContext({
  mode: MODES.INTERACT,
  currentShapeType: undefined,
  shapes: undefined,
  history: undefined,
  setMode: (mode) => {},
  addShape: (shape) => {},
  clearShapes: () => {},
  setHistory: (history) => {},
  setCurrentShapeType: (shapeType) => {},
});

const StateContextProvider = ({ children }) => {
  const [mode, setMode] = useState(MODES.INTERACT);
  const [currentShapeType, setCurrentShapeType] = useState(MODES.INTERACT);
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);

  return (
    <StateContext.Provider
      value={{
        mode,
        currentShapeType,
        shapes,
        history,
        setMode,
        addShape: (shape) => setShapes([...shapes, shape]),
        clearShapes: () => setShapes([]),
        setHistory,
        setCurrentShapeType,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
