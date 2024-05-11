import { useContext } from "react";
import { StateContext } from "../../StateContextProvider";

const DrawingShapeOptions = () => {
  const {
    state: { strokeWidth, strokeColor },
    setStrokeWidth,
    setStrokeColor,
  } = useContext(StateContext);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", color: "#000" }}>
        <span>Stroke width:</span>
        <select
          onChange={(e) => setStrokeWidth(e.target.value)}
          value={strokeWidth}
        >
          <option value={1}>1px</option>
          <option value={2}>2px</option>
          <option value={3}>3px</option>
          <option value={4}>4px</option>
          <option value={5}>5px</option>
          <option value={6}>6px</option>
          <option value={7}>7px</option>
          <option value={8}>8px</option>
          <option value={9}>9px</option>
          <option value={10}>10px</option>
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column", color: "#000" }}>
        <span>Stroke color:</span>
        <select
          onChange={(e) => setStrokeColor(e.target.value)}
          value={strokeColor}
        >
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="brown">Brown</option>
          <option value="purple">Purple</option>
          <option value="orange">Orange</option>
          <option value="pink">Pink</option>
        </select>
      </div>
    </>
  );
};

export default DrawingShapeOptions;
