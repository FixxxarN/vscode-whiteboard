import { useCallback, useContext, useEffect, useState } from "react";
import { Canvas } from "./styles.js";
import { StateContext } from "../../StateContextProvider/index.jsx";
import useResizeAndScale from "../useResizeAndScale.js";
import PubSub from "pubsub-js";
import { CLEAR_CANVAS } from "../../../common/events.js";
import useCanvasManagement from "../useCanvasManagement.js";
import useDrawShapes from "../../../hooks/useDrawShapes/index.js";
import useStaticCanvasEventHandlers from "../../../hooks/useStaticCanvasEventHandlers.js/index.js";

const StaticCanvas = () => {
  const [canvas, setCanvas] = useState(undefined);
  const [context, setContext] = useState(undefined);

  useResizeAndScale(canvas, context);
  useStaticCanvasEventHandlers(canvas, context);
  useDrawShapes(canvas, context);

  const refCallback = useCallback((canvas) => {
    setCanvas(canvas);
    setContext(canvas.getContext("2d"));
  }, []);

  return <Canvas ref={refCallback} />;
};

export default StaticCanvas;
