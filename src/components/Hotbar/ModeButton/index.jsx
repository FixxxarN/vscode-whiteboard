import IconButton from "@mui/material/IconButton";

const ModeButton = ({ icon, onClick }) => {
  return <IconButton onClick={onClick}>{icon}</IconButton>;
};

export default ModeButton;
