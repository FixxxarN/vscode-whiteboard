import { useCallback, useState } from "react";
import { Canvas } from "./styles.js";
import useEventListeners from "../../../hooks/useEventListeners/index.js";
import useResizeAndScale from "../useResizeAndScale.js";

const DynamicCanvas = () => {
  const [canvas, setCanvas] = useState(undefined);
  const [context, setContext] = useState(undefined);

  useResizeAndScale(canvas, context);

  const refCallback = useCallback((canvas) => {
    if (canvas) {
      setCanvas(canvas);
      setContext(canvas.getContext("2d"));
    }
  }, []);

  const eventListeners = useEventListeners(canvas, context);

  return (
    <Canvas
      id="dynamic-canvas"
      onMouseDown={(event) => {
        if (!eventListeners?.onMouseDown) return;
        eventListeners.onMouseDown(event);
      }}
      onMouseMove={(event) => {
        if (!eventListeners?.onMouseMove) return;
        eventListeners.onMouseMove(event);
      }}
      onMouseUp={(event) => {
        if (!eventListeners?.onMouseUp) return;
        eventListeners.onMouseUp(event);
      }}
      onKeyDown={(event) => {
        if (!eventListeners?.onKeyDown) return;
        eventListeners.onKeyDown(event);
      }}
      ref={refCallback}
    />
  );
};

export default DynamicCanvas;
