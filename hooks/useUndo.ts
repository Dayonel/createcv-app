import { useState } from 'react';

export const useUndo = (json: string) => {
  const [state, _setState] = useState<string>(json);
  const [history, setHistory] = useState<string[]>([json]);
  const [index, setIndex] = useState(0); // Current history index

  const undo = () => {
    if (index > 0) {
      setIndex(index - 1);
      _setState(history[index - 1]);
    }
  };

  const redo = () => {
    if (index < history.length - 1) {
      setIndex(index + 1);
      _setState(history[index + 1]);
    }
  };

  const setState = (newState: string) => {
    _setState(newState);
    // history of 100
    if (history.length === 100) {
      setHistory(history.slice(1)); // Remove the oldest entry
    }
    setHistory([...history, newState]);
    setIndex(history.length); // Update index to point to new state
  };

  const resetHistory = () => {
    setHistory([]);
    setIndex(0);
  };

  return {
    state,
    setState,
    undo,
    redo,
    canUndo: index > 0,
    canRedo: index < history.length - 1,
    resetHistory,
  };
};
