import Arrow from "../../common/shapes/arrow";
import Circle from "../../common/shapes/circle";
import Pencil from "../../common/shapes/pencil";
import Rectangle from "../../common/shapes/rectangle";
import Text from "../../common/shapes/text";
import { SHAPE_TYPES } from "../StateContextProvider/constants";

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
    if (shape.type === SHAPE_TYPES.TEXT) {
      const text = new Text(shape.point, shape.font, shape.fillStyle);
      text.setValues(shape)
      return text;
    }
  });

  return reCreatedShapes;
}