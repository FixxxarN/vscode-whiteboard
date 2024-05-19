import IconButton from "@mui/material/IconButton";

const ModeButton = ({ icon, selected, onClick }) => {
  return (
    <IconButton
      sx={{ color: selected ? "#090909" : "#a1a1a1" }}
      onClick={onClick}
    >
      {icon}
    </IconButton>
  );
};

export default ModeButton;
