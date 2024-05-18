import { useCallback, useContext, useEffect } from "react";
import Picture from "../../common/shapes/picture";
import { ShapesContext } from "../../components/ShapesContextProvider";

const usePastePicture = () => {
  const { addShape } = useContext(ShapesContext);

  const addPastedImageToShapes = useCallback(
    async (event) => {
      if (!event.clipboardData?.items?.length) return;

      const { items } = event.clipboardData;

      for (const item of items) {
        if (!item.type.startsWith("image/")) continue;

        const file = item.getAsFile();
        const bitmap = await createImageBitmap(file);

        addShape(new Picture({ x: 0, y: 0 }, bitmap));
      }
    },
    [addShape]
  );

  useEffect(() => {
    window.addEventListener("paste", addPastedImageToShapes);

    return () => {
      window.removeEventListener("paste", addPastedImageToShapes);
    };
  }, []);
};

export default usePastePicture;