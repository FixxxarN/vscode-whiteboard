import { throttle } from "../../common/utils";
const { useEffect, useCallback, useContext } = require("react");
const { StateContext } = require("../../components/StateContextProvider");

const useZoom = (canvas) => {
  const { state, setScale, setOrigin, setBoundingBox } = useContext(StateContext);
  const { scale, origin } = state;

  const zoom = useCallback(
    (event) => {
      event.preventDefault();
      const { deltaY } = event;

      const newScale = deltaY < 0 ? scale * 1.1 : scale * 0.9;

      if (newScale < 5 && newScale > 0.5) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = (event.clientX - rect.left) * window.devicePixelRatio;
        const mouseY = (event.clientY - rect.top) * window.devicePixelRatio;

        const worldX = (mouseX - origin.x) / scale;
        const worldY = (mouseY - origin.y) / scale;

        const newTranslatePos = {
          x: mouseX - worldX * newScale,
          y: mouseY - worldY * newScale,
        };

        const bottomLeft = {
          x: -newTranslatePos.x / newScale,
          y: (canvas.height - newTranslatePos.y) / newScale,
        };

        const topRight = {
          x: (canvas.width - newTranslatePos.x) / newScale,
          y: -newTranslatePos.y / newScale,
        };

        setScale(newScale);
        setOrigin(newTranslatePos);
        setBoundingBox({ bottomLeft, topRight });
      }
    },
    [scale, origin, setScale, setOrigin, setBoundingBox, canvas]
  );

  const throttledZoom = useCallback((event) => throttle(zoom(event), 50), [zoom]);

  useEffect(() => {
    if (canvas) {
      canvas.addEventListener("wheel", throttledZoom);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("wheel", throttledZoom);
      }
    };
  }, [canvas, throttledZoom]);
};

export default useZoom;