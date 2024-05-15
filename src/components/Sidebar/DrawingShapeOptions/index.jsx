import { useContext } from "react";
import { StateContext } from "../../StateContextProvider";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DrawingShapeOptions = () => {
  const { state, setStrokeWidth, setStrokeColor } = useContext(StateContext);
  const { strokeWidth, strokeColor } = state;

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", color: "#000" }}>
        <FormControl fullWidth>
          <Select
            id="stroke-width-select"
            value={strokeWidth}
            label="Stroke width"
            onChange={(e) => setStrokeWidth(e.target.value)}
          >
            <MenuItem value={1}>1px</MenuItem>
            <MenuItem value={2}>2px</MenuItem>
            <MenuItem value={3}>3px</MenuItem>
            <MenuItem value={4}>4px</MenuItem>
            <MenuItem value={5}>5px</MenuItem>
            <MenuItem value={6}>6px</MenuItem>
            <MenuItem value={7}>7px</MenuItem>
            <MenuItem value={8}>8px</MenuItem>
            <MenuItem value={9}>9px</MenuItem>
            <MenuItem value={10}>10px</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ display: "flex", flexDirection: "column", color: "#000" }}>
        <FormControl fullWidth>
          <Select
            id="stroke-color-select"
            value={strokeColor}
            label="Stroke color"
            onChange={(e) => setStrokeColor(e.target.value)}
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

export default DrawingShapeOptions;
