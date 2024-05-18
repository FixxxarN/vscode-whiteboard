import { useCallback, useState } from "react";
import { Canvas } from "./styles.js";
import useResizeAndScale from "../useResizeAndScale.js";
import useDrawShapes from "../../../hooks/useDrawShapes/index.js";
import useStaticCanvasEventHandlers from "../../../hooks/useStaticCanvasEventHandlers.js/index.js";
import useUndoRedo from "../../../hooks/useUndoRedo/index.js";
import usePastePicture from "../../../hooks/usePastePicture/index.js";

const StaticCanvas = () => {
  const [canvas, setCanvas] = useState(undefined);
  const [context, setContext] = useState(undefined);

  useResizeAndScale(canvas, context);
  useStaticCanvasEventHandlers(canvas, context);
  useDrawShapes(canvas, context);
  useUndoRedo();
  usePastePicture();

  const refCallback = useCallback((canvas) => {
    setCanvas(canvas);
    setContext(canvas.getContext("2d"));
  }, []);

  return <Canvas ref={refCallback} />;
};

export default StaticCanvas;
