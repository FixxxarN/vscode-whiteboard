import DynamicCanvas from "../canvases/DynamicCanvas/index.jsx";
import StaticCanvas from "../canvases/StaticCanvas/index.jsx";
import Hotbar from "../Hotbar/index.jsx";

const Whiteboard = () => {
  return (
    <>
      <StaticCanvas />
      <DynamicCanvas />
      <Hotbar />
    </>
  );
};

export default Whiteboard;
