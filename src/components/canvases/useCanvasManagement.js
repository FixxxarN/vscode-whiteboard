import { useCallback } from "react"

const useCanvasManagement = (canvas, context) => {
  const clearCanvas = useCallback(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
  }, [canvas, context]);

  return { clearCanvas };
}

export default useCanvasManagement;