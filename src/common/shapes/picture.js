import { SHAPE_TYPES } from "../../components/StateContextProvider/constants";
import { calculateBoundingBox } from "../utils";
import Shape from "./shape";

class Picture extends Shape {
  constructor(point, bitmap) {
    super();
    this.id = crypto.randomUUID();
    this.point = point;
    this.bitmap = bitmap

    this.type = SHAPE_TYPES.PICTURE;

    this.boundingBox = undefined;
  }

  draw(context) {
    context.moveTo(this.point.x, this.point.y);
    context.drawImage(this.bitmap, this.point.x, this.point.y, this.bitmap.width / 2, this.bitmap.height / 2)
    this.updateBoundingBox()
  }

  move(changedPoints, context, clearCanvas) {
    clearCanvas();
    const arrayOfXCoordinates = changedPoints.map((point) => point.x);
    const arrayOfYCoordinates = changedPoints.map((point) => point.y);
    this.point = { x: Math.min(...arrayOfXCoordinates), y: Math.min(...arrayOfYCoordinates) };
    this.updateBoundingBox();
    this.draw(context)
    this.drawBorder(context);
  }

  onMouseUp(event, canvas, context, currentShape, addShape, clearCanvas) {
    addShape(currentShape.current);
    clearCanvas();
    currentShape.current = undefined;
  }

  updateBoundingBox() {
    this.points = [{ x: this.point.x, y: this.point.y + this.bitmap.height / 2 }, { x: this.point.x + this.bitmap.width / 2, y: this.point.y }]
    this.boundingBox = calculateBoundingBox(this.points);
  }
}

export default Picture;