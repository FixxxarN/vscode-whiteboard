import { MODES } from "./constants";

export const actions = {
  SET_MODE: 'SET_MODE',
  SET_CURRENT_SHAPE_TYPE: 'SET_CURRENT_SHAPE_TYPE',
  SET_TEXT_SIZE: 'SET_TEXT_SIZE',
  SET_TEXT_COLOR: 'SET_TEXT_COLOR',
  SET_STROKE_WIDTH: 'SET_STROKE_WIDTH',
  SET_STROKE_COLOR: 'SET_STROKE_COLOR',
  SET_SCALE: 'SET_SCALE',
  SET_ORIGIN: 'SET_ORIGIN',
  SET_BOUNDING_BOX: 'SET_BOUNDING_BOX'
}

export const action = (type, data) => ({ type, data });

export const initialState = {
  mode: MODES.INTERACT,
  currentShapeType: undefined,
  textSize: 16,
  textColor: 'black',
  strokeWidth: 1,
  strokeColor: 'black',
  scale: 1,
  origin: { x: 0, y: 0 },
  boundingBox: undefined,
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
    case actions.SET_SCALE: {
      const scale = action.data;

      return { ...state, scale }
    }
    case actions.SET_ORIGIN: {
      const origin = action.data;

      return { ...state, origin: { ...origin } }
    }
    case actions.SET_BOUNDING_BOX: {
      const boundingBox = action.data;

      return { ...state, boundingBox: { ...boundingBox } }
    }
  }
}

export default reducer;