/* eslint-disable no-undef */
import { useCallback, useEffect } from "react";

const useResizeAndScale = (canvas, context, scale, origin) => {
  const resize = useCallback(() => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;

    const devicePixelRatio = window.devicePixelRatio;

    canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
    canvas.width = Math.floor(window.innerWidth * devicePixelRatio);

    context.save();

    context.translate(origin.x, origin.y);
    context.scale(scale, scale);

    context.restore();
  }, [canvas, context, scale, origin]);

  useEffect(() => {
    if (canvas && context) {
      resize();

      window.addEventListener('resize', resize);

      return () => {
        window.removeEventListener('resize', resize)
      }
    }
  }, [canvas, context, scale, origin]);
}

export default useResizeAndScale;