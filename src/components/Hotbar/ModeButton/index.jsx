import { Button } from "./styles.js";

const ModeButton = ({ text, onClick }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

export default ModeButton;
