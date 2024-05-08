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
  strokeWidth: undefined,
  updateStrokeWidth: (strokeWidth) => {},
  strokeColor: undefined,
  updateStrokeColor: (strokeColor) => {},
});

const StateContextProvider = ({ vscode, children }) => {
  const [mode, setMode] = useState(MODES.INTERACT);
  const [currentShapeType, setCurrentShapeType] = useState(MODES.INTERACT);
  const [textSize, setTextSize] = useState(6);
  const [textColor, setTextColor] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [strokeColor, setStrokeColor] = useState("black");

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

  const updateStrokeWidth = useCallback(
    (strokeWidth) => {
      const prevState = vscode.getState();
      setStrokeWidth(strokeWidth);
      vscode.setState({ ...prevState, strokeWidth: strokeWidth });
    },
    [vscode]
  );

  const updateStrokeColor = useCallback(
    (strokeColor) => {
      const prevState = vscode.getState();
      setStrokeColor(strokeColor);
      vscode.setState({ ...prevState, strokeColor: strokeColor });
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
        strokeWidth,
        strokeColor,
        updateTextSize,
        updateTextColor,
        updateStrokeWidth,
        updateStrokeColor,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
