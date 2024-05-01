import { createContext, useCallback, useState } from "react";

export const ShapesContext = createContext({
  shapes: undefined,
  history: undefined,
  addShape: (shape) => {},
  popShape: () => {},
  addHistoricalShape: (historicalShape) => {},
  popHistoricalShape: () => {},
  clearShapes: () => {},
});

const ShapesContextProvider = ({ children }) => {
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);

  const addShape = useCallback(
    (shape) => {
      setShapes([...shapes, shape]);
      return shape;
    },
    [shapes]
  );

  const popShape = useCallback(() => {
    const shapesArray = [...shapes];
    const poppedShape = shapesArray.pop();

    setShapes([...shapesArray]);

    return poppedShape;
  }, [shapes]);

  const addHistoricalShape = useCallback(
    (historicalShape) => {
      setHistory([...history, historicalShape]);
      return historicalShape;
    },
    [history]
  );

  const popHistoricalShape = useCallback(() => {
    const historyArray = [...history];
    const poppedHistoricalShape = historyArray.pop();

    setHistory([...historyArray]);

    return poppedHistoricalShape;
  }, [history]);

  return (
    <ShapesContext.Provider
      value={{
        shapes,
        history,
        addShape,
        popShape,
        addHistoricalShape,
        popHistoricalShape,
        clearShapes: () => {
          console.log("clearing shapes");
          setShapes([]);
        },
      }}
    >
      {children}
    </ShapesContext.Provider>
  );
};

export default ShapesContextProvider;
