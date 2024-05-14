import { useCallback, useContext } from "react";
import ModeButton from "./ModeButton/index.jsx";
import { Container } from "./styles.js";
import { StateContext } from "../StateContextProvider/index.jsx";
import { MODES, SHAPE_TYPES } from "../StateContextProvider/constants.js";
import PubSub from "pubsub-js";
import { CLEAR_CANVAS, EXPORT_CANVAS } from "../../common/events.js";

const Hotbar = () => {
  const { setMode, setCurrentShapeType } = useContext(StateContext);

  const onExportClick = useCallback(() => {
    PubSub.publish(EXPORT_CANVAS);
  }, []);

  const onClearClick = useCallback(() => {
    PubSub.publish(CLEAR_CANVAS);
  }, []);

  const onInteractClick = useCallback(() => {
    setMode(MODES.INTERACT);
    setCurrentShapeType(undefined);
  }, []);

  const onPencilClick = useCallback(() => {
    setMode(MODES.DRAW);
    setCurrentShapeType(SHAPE_TYPES.PENCIL);
  }, []);

  const onRectangleClick = useCallback(() => {
    setMode(MODES.DRAW);
    setCurrentShapeType(SHAPE_TYPES.RECTANGLE);
  }, []);

  const onCircleClick = useCallback(() => {
    setMode(MODES.DRAW);
    setCurrentShapeType(SHAPE_TYPES.CIRCLE);
  }, []);

  const onArrowClick = useCallback(() => {
    setMode(MODES.DRAW);
    setCurrentShapeType(SHAPE_TYPES.ARROW);
  }, []);

  const onTextClick = useCallback(() => {
    setMode(MODES.DRAW);
    setCurrentShapeType(SHAPE_TYPES.TEXT);
  }, []);

  return (
    <Container>
      <ModeButton text="Export" onClick={onExportClick} />
      <ModeButton text="Clear" onClick={onClearClick} />
      <ModeButton text="Interact" onClick={onInteractClick} />
      <ModeButton text="Pencil" onClick={onPencilClick} />
      <ModeButton text="Rectangle" onClick={onRectangleClick} />
      <ModeButton text="Circle" onClick={onCircleClick} />
      <ModeButton text="Arrow" onClick={onArrowClick} />
      <ModeButton text="Text" onClick={onTextClick} />
    </Container>
  );
};

export default Hotbar;
