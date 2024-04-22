import { SHAPE_TYPES } from "../constants"
import Arrow from "./Arrow/arrow";
import Circle from "./Circle/circle";
import Pencil from "./Pencil/pencil";
import Rectangle from "./Rectangle/rectangle"

export const reCreateShapes = (shapes) => {
  const reCreatedShapes = shapes.map((shape) => {
    if (shape.type === SHAPE_TYPES.PENCIL) {
      return new Pencil(shape.points, shape.strokeWidth, shape.strokeColor);
    }
    if (shape.type === SHAPE_TYPES.RECTANGLE) {
      return new Rectangle(shape.points, shape.strokeWidth, shape.strokeColor);
    }
    if (shape.type === SHAPE_TYPES.CIRCLE) {
      return new Circle(shape.points, shape.strokeWidth, shape.strokeColor);
    }
    if (shape.type === SHAPE_TYPES.ARROW) {
      return new Arrow(shape.points, shape.strokeWidth, shape.strokeColor);
    }
  });

  return reCreatedShapes;
}