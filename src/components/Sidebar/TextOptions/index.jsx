import { useContext } from "react";
import { StateContext } from "../../StateContextProvider";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const TextOptions = () => {
  const { state, setTextSize, setTextColor } = useContext(StateContext);
  const { textSize, textColor } = state;

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", color: "#000" }}>
        <FormControl fullWidth>
          <Select
            id="text-size-select"
            value={textSize}
            label="Text size"
            onChange={(e) => setTextSize(e.target.value)}
          >
            <MenuItem value={6}>6px</MenuItem>
            <MenuItem value={8}>8px</MenuItem>
            <MenuItem value={10}>10px</MenuItem>
            <MenuItem value={12}>12px</MenuItem>
            <MenuItem value={14}>14px</MenuItem>
            <MenuItem value={16}>16px</MenuItem>
            <MenuItem value={18}>18px</MenuItem>
            <MenuItem value={20}>20px</MenuItem>
            <MenuItem value={22}>22px</MenuItem>
            <MenuItem value={24}>24px</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ display: "flex", flexDirection: "column", color: "#000" }}>
        <FormControl fullWidth>
          <Select
            id="text-color-select"
            value={textColor}
            label="Text color"
            onChange={(e) => setTextColor(e.target.value)}
          >
            <MenuItem value="black">Black</MenuItem>
            <MenuItem value="white">White</MenuItem>
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="green">Green</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
            <MenuItem value="brown">Brown</MenuItem>
            <MenuItem value="purple">Purple</MenuItem>
            <MenuItem value="orange">Orange</MenuItem>
            <MenuItem value="pink">Pink</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default TextOptions;
