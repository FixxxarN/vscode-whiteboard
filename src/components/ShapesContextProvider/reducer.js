export const actions = {
  ADD_SHAPE: 'ADD_SHAPE',
  POP_SHAPE: 'POP_SHAPE',
  REMOVE_SHAPE_BY_ID: 'REMOVE_SHAPE_BY_ID',
  ADD_HISTORICAL_SHAPE: 'ADD_HISTORICAL_SHAPE',
  POP_HISTORICAL_SHAPE: 'POP_HISTORICAL_SHAPE',
  CLEAR_SHAPES: 'CLEAR_SHAPES',
  CLEAR_HISTORICAL_SHAPES: 'CLEAR_HISTORICAL_SHAPES'
}

export const action = (type, data) => ({ type, data });

export const initialState = {
  shapes: [],
  historicalShapes: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_SHAPE: {
      const shape = action.data
      const newShapes = [...state.shapes, shape];
      return { ...state, shapes: newShapes }
    }
    case actions.POP_SHAPE: {
      const shapesArray = [...state.shapes];
      shapesArray.pop();
      return { ...state, shapes: shapesArray }
    }
    case actions.REMOVE_SHAPE_BY_ID: {
      const idToBeRemoved = action.data;
      const shapesArray = [...state.shapes];

      const index = shapesArray.findIndex((shape) => shape.id === idToBeRemoved);

      if (index !== -1) {
        shapesArray.splice(index, 1);
      }

      return { ...state, shapes: shapesArray }
    }
    case actions.ADD_HISTORICAL_SHAPE: {
      const historicalShape = action.data
      const newShapes = [...state.historicalShapes, historicalShape];
      return { ...state, historicalShapes: newShapes }
    }
    case actions.POP_HISTORICAL_SHAPE: {
      const shapesArray = [...state.historicalShapes];
      shapesArray.pop();
      return { ...state, historicalShapes: shapesArray }
    }
    case actions.CLEAR_SHAPES: {
      return { ...state, shapes: [] }
    }
    case actions.CLEAR_HISTORICAL_SHAPES: {
      return { ...state, historicalShapes: [] }
    }
  }
}

export default reducer;