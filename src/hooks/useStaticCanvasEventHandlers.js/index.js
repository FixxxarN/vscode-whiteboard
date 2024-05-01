import { useContext, useEffect } from "react";
import useCanvasManagement from "../../components/canvases/useCanvasManagement";
import { StateContext } from "../../components/StateContextProvider";
import { CLEAR_CANVAS, EXPORT_CANVAS } from "../../common/events";
import PubSub from "pubsub-js";
import { exportCanvas } from "./utils";

const useStaticCanvasEventHandlers = (canvas, context) => {
  const { clearShapes } = useContext(StateContext);
  const { clearCanvas } = useCanvasManagement(canvas, context);


  useEffect(() => {
    PubSub.subscribe(CLEAR_CANVAS, () => {
      clearCanvas();
      clearShapes();
    });

    PubSub.subscribe(EXPORT_CANVAS, () => {
      exportCanvas(canvas);
    });

    return () => {
      PubSub.unsubscribe(CLEAR_CANVAS);
      PubSub.unsubscribe(EXPORT_CANVAS);
    };
  }, [canvas, clearCanvas, clearShapes]);
}

export default useStaticCanvasEventHandlers;