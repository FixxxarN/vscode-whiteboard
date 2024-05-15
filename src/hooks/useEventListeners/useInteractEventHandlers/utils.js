export const getInteraceEventHandlers = ({ canvas, context, shapes, hoveredShape, mouseDownPosition, hoveredShapePoints, mouseDown, removeShapeById, addShape, clearCanvas }) => {
  const onMouseDown = (event) => {
    if (hoveredShape.current) {
      mouseDown.current = true;
      hoveredShapePoints.current = hoveredShape.current.points;
      mouseDownPosition.current = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };
    }
  }

  const onMouseMove = (event) => {
    const mousePosition = { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };

    if (mouseDown.current) {
      if (hoveredShape.current?.id) {
        removeShapeById(hoveredShape.current.id);
      }
      const mouseDiff = { x: mouseDownPosition.current.x - mousePosition.x, y: mouseDownPosition.current.y - mousePosition.y };
      const changedPoints = hoveredShapePoints.current.map((point) => ({
        x: point.x - mouseDiff.x,
        y: point.y - mouseDiff.y
      }));
      hoveredShape.current.move(changedPoints, context, clearCanvas)
    }
    else {
      for (let i = 0; i < shapes.length; i++) {
        if (
          mousePosition.x >= shapes[i].boundingBox.bottomLeft.x &&
          mousePosition.y <= shapes[i].boundingBox.bottomLeft.y &&
          mousePosition.x <= shapes[i].boundingBox.topRight.x &&
          mousePosition.y >= shapes[i].boundingBox.topRight.y
        ) {
          if (hoveredShape.current?.id === shapes[i].id) return;
          document.getElementById('dynamic-canvas').style.cursor = 'move'
          hoveredShape.current = shapes[i];
          break;
        }
        else {
          document.getElementById('dynamic-canvas').style.cursor = 'default'
          hoveredShape.current = undefined;
        }
      }
    }
  }

  const onMouseUp = (event) => {
    hoveredShape.current.updateBoundingBox(context);
    addShape(hoveredShape.current);
    clearCanvas();
    hoveredShape.current = undefined;
    mouseDown.current = false;
  }

  return { onMouseDown, onMouseMove, onMouseUp }
}