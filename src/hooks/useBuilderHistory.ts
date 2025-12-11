import { useState, useCallback } from 'react';
import { ComponentBlock } from '@/types/builder';

interface HistoryState {
  past: ComponentBlock[][];
  present: ComponentBlock[];
  future: ComponentBlock[][];
}

export const useBuilderHistory = (initialState: ComponentBlock[] = []) => {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: initialState,
    future: [],
  });

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const setState = useCallback((newPresent: ComponentBlock[], skipHistory = false) => {
    if (skipHistory) {
      setHistory((prev) => ({ ...prev, present: newPresent }));
    } else {
      setHistory((prev) => ({
        past: [...prev.past, prev.present],
        present: newPresent,
        future: [],
      }));
    }
  }, []);

  const undo = useCallback(() => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev;
      const newPast = [...prev.past];
      const newPresent = newPast.pop()!;
      return {
        past: newPast,
        present: newPresent,
        future: [prev.present, ...prev.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev;
      const newFuture = [...prev.future];
      const newPresent = newFuture.shift()!;
      return {
        past: [...prev.past, prev.present],
        present: newPresent,
        future: newFuture,
      };
    });
  }, []);

  return {
    blocks: history.present,
    setBlocks: setState,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
