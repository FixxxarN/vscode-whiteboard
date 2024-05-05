import { useContext } from "react";
import { StateContext } from "../../StateContextProvider";

const TextOptions = () => {
  const { textSize, textColor, updateTextSize, updateTextColor } =
    useContext(StateContext);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", color: "#000" }}>
        <span>Font size:</span>
        <select
          onChange={(e) => updateTextSize(e.target.value)}
          value={textSize}
        >
          <option value="6">6px</option>
          <option value="8">8px</option>
          <option value="10">10px</option>
          <option value="12">12px</option>
          <option value="14">14px</option>
          <option value="16">16px</option>
          <option value="18">18px</option>
          <option value="20">20px</option>
          <option value="22">22px</option>
          <option value="24">24px</option>
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column", color: "#000" }}>
        <span>Text color:</span>
        <select
          onChange={(e) => updateTextColor(e.target.value)}
          value={textColor}
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

export default TextOptions;
