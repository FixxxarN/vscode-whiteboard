const { useEffect, useCallback, useContext } = require("react");
const { StateContext } = require("../../components/StateContextProvider");

const useZoom = (canvas) => {
  const { state, setScale, setOrigin } = useContext(StateContext);
  const { scale, origin } = state;

  const zoom = useCallback(
    (event) => {
      event.preventDefault();
      const { deltaY } = event;

      const newScale = deltaY < 0 ? scale * 1.1 : scale * 0.9;

      if (newScale < 5 && newScale > 0.5) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = (event.clientX - rect.left) * 2;
        const mouseY = (event.clientY - rect.top) * 2;

        const worldX = (mouseX - origin.x) / scale;
        const worldY = (mouseY - origin.y) / scale;

        const newTranslatePos = {
          x: mouseX - worldX * newScale,
          y: mouseY - worldY * newScale,
        };

        setScale(newScale);
        setOrigin(newTranslatePos);
      }
    },
    [scale, origin, setScale, setOrigin, canvas]
  );

  useEffect(() => {
    if (canvas) {
      canvas.addEventListener("wheel", zoom);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("wheel", zoom);
      }
    };
  }, [canvas, zoom]);
};

export default useZoom;