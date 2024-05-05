import { useContext } from "react";
import { Container } from "./styles";
import { StateContext } from "../StateContextProvider";
import { MODES, SHAPE_TYPES } from "../StateContextProvider/constants";
import TextOptions from "./TextOptions";

const Sidebar = () => {
  const { mode, currentShapeType } = useContext(StateContext);

  if (mode !== MODES.DRAW) {
    return null;
  }

  return (
    <Container>
      {currentShapeType === SHAPE_TYPES.TEXT && <TextOptions />}
    </Container>
  );
};

export default Sidebar;
