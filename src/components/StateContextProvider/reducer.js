import { MODES } from "./constants";

export const actions = {
  SET_MODE: 'SET_MODE',
  SET_CURRENT_SHAPE_TYPE: 'SET_CURRENT_SHAPE_TYPE',
  SET_TEXT_SIZE: 'SET_TEXT_SIZE',
  SET_TEXT_COLOR: 'SET_TEXT_COLOR',
  SET_STROKE_WIDTH: 'SET_TEXT_SIZE',
  SET_STROKE_COLOR: 'SET_TEXT_COLOR',
}

export const action = (type, data) => ({ type, data });

export const initialState = {
  mode: MODES.INTERACT,
  currentShapeType: undefined,
  textSize: 6,
  textColor: 'black',
  strokeWidth: 1,
  strokeColor: 'black',
}

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_MODE: {
      const mode = action.data;

      return { ...state, mode }
    }
    case actions.SET_CURRENT_SHAPE_TYPE: {
      const currentShapeType = action.data;

      return { ...state, currentShapeType }
    }
    case actions.SET_TEXT_SIZE: {
      const textSize = action.data;

      return { ...state, textSize }
    }
    case actions.SET_TEXT_COLOR: {
      const textColor = action.data;

      return { ...state, textColor }
    }
    case actions.SET_STROKE_WIDTH: {
      const strokeWidth = action.data;

      return { ...state, strokeWidth }
    }
    case actions.SET_STROKE_COLOR: {
      const strokeColor = action.data;

      return { ...state, strokeColor }
    }
  }
}

export default reducer;