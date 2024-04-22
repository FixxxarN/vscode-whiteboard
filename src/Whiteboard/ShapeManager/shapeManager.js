import { reCreateShapes } from "../Shape/utils";

class ShapeManager {
  constructor(vscode) {
    this.vscode = vscode;

    this.shapes = vscode.getState() ? reCreateShapes(vscode.getState().shapes) : [];
    this.history = vscode.getState() ? reCreateShapes(vscode.getState().history) : [];
  }

  addShape(shape) {
    this.shapes.push(shape);
    this.vscode.setState({ shapes: this.shapes, history: this.history });
  }

  clearShapes() {
    this.shapes = [];
    this.vscode.setState({ shapes: [], history: this.history });
  }

  clearHistory() {
    this.history = [];
    this.vscode.setState({ shapes: this.shapes, history: [] });
  }
}

export default ShapeManager;