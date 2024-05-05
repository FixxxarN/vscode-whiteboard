import DynamicCanvas from "../Canvases/DynamicCanvas/index.jsx";
import StaticCanvas from "../Canvases/StaticCanvas/index.jsx";
import Hotbar from "../Hotbar/index.jsx";
import Sidebar from "../Sidebar/index.jsx";

const Whiteboard = () => {
  return (
    <>
      <StaticCanvas />
      <DynamicCanvas />
      <Hotbar />
      <Sidebar />
    </>
  );
};

export default Whiteboard;
