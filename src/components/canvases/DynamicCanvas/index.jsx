import { useCallback, useContext, useRef, useState } from "react";
import { Canvas } from "./styles.js";
import useEventListeners from "../../../hooks/useEventListeners/index.js";
import useResizeAndScale from "../useResizeAndScale.js";
import { StateContext } from "../../StateContextProvider/index.jsx";
import useZoom from "../../../hooks/useZoom/index.js";

const DynamicCanvas = () => {
  const [canvas, setCanvas] = useState(undefined);
  const [context, setContext] = useState(undefined);
  const animationFrameId = useRef(undefined);

  const { state } = useContext(StateContext);
  const { scale, origin } = state;

  useResizeAndScale(canvas, context, scale, origin);
  useZoom(canvas);

  const refCallback = useCallback((canvas) => {
    if (canvas) {
      setCanvas(canvas);
      setContext(canvas.getContext("2d"));
    }
  }, []);

  const setCanvasScale = () => {
    context.save();

    const devicePixelRatio = window.devicePixelRatio;

    canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
    canvas.width = Math.floor(window.innerWidth * devicePixelRatio);

    context.translate(origin.x, origin.y);
    context.scale(scale, scale);

    context.restore();
  };

  const eventListeners = useEventListeners(canvas, context);

  return (
    <Canvas
      id="dynamic-canvas"
      onMouseDown={(event) => {
        if (!eventListeners?.onMouseDown) return;
        eventListeners.onMouseDown(event);
        setCanvasScale();
      }}
      onMouseMove={(event) => {
        if (!eventListeners?.onMouseMove) return;

        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }

        animationFrameId.current = requestAnimationFrame(() => {
          eventListeners.onMouseMove(event);
        });
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
