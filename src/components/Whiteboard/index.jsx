import DynamicCanvas from "../Canvases/DynamicCanvas/index.jsx";
import StaticCanvas from "../Canvases/StaticCanvas/index.jsx";
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
