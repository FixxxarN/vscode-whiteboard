/* eslint-disable no-undef */
import { useEffect } from "react";

const useResizeAndScale = (canvas, context) => {
  const resize = () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;

    const scale = window.devicePixelRatio;

    canvas.height = Math.floor(window.innerHeight * scale);
    canvas.width = Math.floor(window.innerWidth * scale);

    context.scale(scale, scale);
  }

  useEffect(() => {
    if (canvas && context) {
      resize();

      window.addEventListener('resize', () => {
        resize();
      });
    }
  }, [canvas, context]);
}

export default useResizeAndScale;