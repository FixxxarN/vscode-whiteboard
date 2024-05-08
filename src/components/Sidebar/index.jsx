import { useContext } from "react";
import { Container } from "./styles";
import { StateContext } from "../StateContextProvider";
import { MODES, SHAPE_TYPES } from "../StateContextProvider/constants";
import TextOptions from "./TextOptions";
import DrawingShapeOptions from "./DrawingShapeOptions";

const Sidebar = () => {
  const { mode, currentShapeType } = useContext(StateContext);

  const isCurrentShapeDrawingShape =
    currentShapeType === SHAPE_TYPES.PENCIL ||
    currentShapeType === SHAPE_TYPES.RECTANGLE ||
    currentShapeType === SHAPE_TYPES.CIRCLE ||
    currentShapeType === SHAPE_TYPES.ARROW;

  if (mode !== MODES.DRAW) {
    return null;
  }

  return (
    <Container>
      {currentShapeType === SHAPE_TYPES.TEXT && <TextOptions />}
      {isCurrentShapeDrawingShape && <DrawingShapeOptions />}
    </Container>
  );
};

export default Sidebar;
