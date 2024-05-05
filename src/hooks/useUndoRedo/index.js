import { useCallback, useContext, useEffect, useRef } from "react";
import { ShapesContext } from "../../components/ShapesContextProvider";

const SHORT_CUTS = {
  'MACOS': {
    'undo': (e) => e.metaKey && !e.shiftKey && e.key.toLowerCase() === 'z',
    'redo': (e) => e.metaKey && e.shiftKey && e.key.toLowerCase() === 'z',
  },
  'WINDOWS': {
    'undo': (e) => e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'z',
    'redo': (e) => e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z',
  },
  'UNIX': {
    'undo': (e) => e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'z',
    'redo': (e) => e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z',
  },
  'LINUX': {
    'undo': (e) => e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'z',
    'redo': (e) => e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z',
  }
}

const resolveOperatingSystem = () => {
  const userAgent = window.navigator.userAgent;

  if (userAgent.indexOf('Mac') !== -1) {
    return 'MACOS';
  }
  if (userAgent.indexOf('Win') !== -1) {
    return 'WINDOWS'
  }
  if (userAgent.indexOf('X11') !== -1) {
    return 'UNIX'
  }
  if (userAgent.indexOf('Linux') !== -1) {
    return 'LINUX'
  }
}

const useUndoRedo = () => {
  const { addShape, popShape, addHistoricalShape, popHistoricalShape } = useContext(ShapesContext)
  const os = resolveOperatingSystem();

  const undoRedo = useCallback((e) => {
    const shortCuts = SHORT_CUTS[os];
    if (shortCuts.undo(e)) {
      const undoShape = popShape();

      if (undoShape) {
        addHistoricalShape(undoShape);
      }
    }
    if (shortCuts.redo(e)) {
      const historyShape = popHistoricalShape();

      if (historyShape) {
        addShape(historyShape);
      }
    }
  }, [addShape, popShape, addHistoricalShape, popHistoricalShape]);

  useEffect(() => {
    window.addEventListener('keydown', undoRedo);

    return () => {
      window.removeEventListener('keydown', undoRedo)
    }
  }, [undoRedo]);
}

export default useUndoRedo;