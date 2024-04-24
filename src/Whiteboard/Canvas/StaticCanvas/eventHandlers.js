// @ts-nocheck
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

const initializeUndoRedoEventListeners = (os, canvas) => {
  const shortCuts = SHORT_CUTS[os];

  window.addEventListener('keydown', (e) => {
    if (shortCuts.undo(e)) {
      const undoShape = canvas.shapeManager.shapes.pop();

      if (undoShape) {
        canvas.shapeManager.history.push(undoShape);
      }
    }
    if (shortCuts.redo(e)) {
      const historyShape = canvas.shapeManager.history.pop();

      if (historyShape) {
        canvas.shapeManager.shapes.push(historyShape);
      }
    }
    canvas.redraw();
  })
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

export const initializeEventListenersForOS = (canvas) => {
  const os = resolveOperatingSystem();

  initializeUndoRedoEventListeners(os, canvas);
}