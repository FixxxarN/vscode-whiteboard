import { createContext, useState } from "react";
import { MODES } from "./constants";

export const StateContext = createContext({
  mode: MODES.INTERACT,
  currentShapeType: undefined,
  setMode: (mode) => {},
  setCurrentShapeType: (shapeType) => {},
});

const StateContextProvider = ({ children }) => {
  const [mode, setMode] = useState(MODES.INTERACT);
  const [currentShapeType, setCurrentShapeType] = useState(MODES.INTERACT);

  return (
    <StateContext.Provider
      value={{
        mode,
        currentShapeType,
        setMode,
        setCurrentShapeType,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
