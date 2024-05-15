import { useCallback, useContext } from "react";
import ModeButton from "./ModeButton/index.jsx";
import { Container } from "./styles.js";
import { StateContext } from "../StateContextProvider/index.jsx";
import { MODES, SHAPE_TYPES } from "../StateContextProvider/constants.js";
import PubSub from "pubsub-js";
import { CLEAR_CANVAS, EXPORT_CANVAS } from "../../common/events.js";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import BrushIcon from "@mui/icons-material/Brush";
import NavigationIcon from "@mui/icons-material/Navigation";
import Crop54Icon from "@mui/icons-material/Crop54";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import TextFieldsIcon from "@mui/icons-material/TextFields";

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
      <ModeButton icon={<DownloadIcon />} onClick={onExportClick} />
      <ModeButton icon={<ClearIcon />} onClick={onClearClick} />
      <ModeButton icon={<NavigationIcon />} onClick={onInteractClick} />
      <ModeButton icon={<BrushIcon />} onClick={onPencilClick} />
      <ModeButton icon={<Crop54Icon />} onClick={onRectangleClick} />
      <ModeButton icon={<CircleOutlinedIcon />} onClick={onCircleClick} />
      <ModeButton icon={<ArrowRightAltIcon />} onClick={onArrowClick} />
      <ModeButton icon={<TextFieldsIcon />} onClick={onTextClick} />
    </Container>
  );
};

export default Hotbar;
