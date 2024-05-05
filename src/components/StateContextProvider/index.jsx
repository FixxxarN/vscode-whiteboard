import { createContext, useCallback, useState } from "react";
import { MODES } from "./constants";

export const StateContext = createContext({
  mode: MODES.INTERACT,
  currentShapeType: undefined,
  setMode: (mode) => {},
  setCurrentShapeType: (shapeType) => {},
  textSize: undefined,
  updateTextSize: (textSize) => {},
  textColor: undefined,
  updateTextColor: (textColor) => {},
});

const StateContextProvider = ({ vscode, children }) => {
  const [mode, setMode] = useState(MODES.INTERACT);
  const [currentShapeType, setCurrentShapeType] = useState(MODES.INTERACT);
  const [textSize, setTextSize] = useState(6);
  const [textColor, setTextColor] = useState("black");

  const updateTextSize = useCallback(
    (textSize) => {
      const prevState = vscode.getState();
      setTextSize(textSize);
      vscode.setState({ ...prevState, textSize: textSize });
    },
    [vscode]
  );

  const updateTextColor = useCallback(
    (textColor) => {
      const prevState = vscode.getState();
      setTextColor(textColor);
      vscode.setState({ ...prevState, textColor: textColor });
    },
    [vscode]
  );

  return (
    <StateContext.Provider
      value={{
        mode,
        currentShapeType,
        setMode,
        setCurrentShapeType,
        textSize,
        textColor,
        updateTextSize,
        updateTextColor,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
