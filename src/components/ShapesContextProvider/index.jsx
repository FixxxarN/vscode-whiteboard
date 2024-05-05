import { createContext, useCallback, useState } from "react";
import { reCreateShapes } from "./utils";

export const ShapesContext = createContext({
  shapes: undefined,
  historicalShapes: undefined,
  addShape: (shape) => shape,
  popShape: () => undefined,
  addHistoricalShape: (historicalShape) => historicalShape,
  popHistoricalShape: () => undefined,
  clearShapes: () => {},
  clearHistoricalShapes: () => {},
});

const ShapesContextProvider = ({ vscode, children }) => {
  const shapesFromState = vscode.getState()?.shapes || [];
  const historicalShapesFromState = vscode.getState()?.historicalShapes || [];

  const [shapes, setShapes] = useState([...reCreateShapes(shapesFromState)]);
  const [historicalShapes, setHistoricalShapes] = useState([
    ...reCreateShapes(historicalShapesFromState),
  ]);

  const addShape = useCallback(
    (shape) => {
      const prevState = vscode.getState();
      const newShapes = [...shapes, shape];

      setShapes(newShapes);

      vscode.setState({ ...prevState, shapes: newShapes });
      return shape;
    },
    [shapes, vscode]
  );

  const popShape = useCallback(() => {
    const prevState = vscode.getState();
    const shapesArray = [...shapes];

    const poppedShape = shapesArray.pop();

    setShapes(shapesArray);

    vscode.setState({ ...prevState, shapes: shapesArray });

    return poppedShape;
  }, [shapes, vscode]);

  const addHistoricalShape = useCallback(
    (historicalShape) => {
      const prevState = vscode.getState();
      const newHistoricalShapes = [...historicalShapes, historicalShape];

      setHistoricalShapes(newHistoricalShapes);

      vscode.setState({ ...prevState, historicalShapes: newHistoricalShapes });
      return historicalShape;
    },
    [historicalShapes, vscode]
  );

  const popHistoricalShape = useCallback(() => {
    const prevState = vscode.getState();
    const historicalShapesArray = [...historicalShapes];

    const poppedHistoricalShape = historicalShapesArray.pop();

    setHistoricalShapes(historicalShapesArray);

    vscode.setState({ ...prevState, historicalShapes: historicalShapesArray });

    return poppedHistoricalShape;
  }, [historicalShapes, vscode]);

  const clearHistoricalShapes = useCallback(() => {
    const prevState = vscode.getState();

    setHistoricalShapes([]);

    vscode.setState({ ...prevState, historicalShapes: [] });
  }, [vscode]);

  return (
    <ShapesContext.Provider
      value={{
        shapes,
        historicalShapes,
        addShape,
        popShape,
        addHistoricalShape,
        popHistoricalShape,
        clearShapes: () => setShapes([]),
        clearHistoricalShapes,
      }}
    >
      {children}
    </ShapesContext.Provider>
  );
};

export default ShapesContextProvider;
