import { create } from 'zustand';

let store = null;

const initStore = (initialState = {}) => {
  return create((set) => ({
    preview: [],
    setPreview: (preview) => set({ preview }),
    selectedOutcome: null,
    setSelectedOutcome: (outcome) => set({ selectedOutcome: outcome }),
    selectedPredictors: [],
    setSelectedPredictors: (predictors) => set({ selectedPredictors: predictors }),
    removedPredictors: [],
    setRemovedPredictors: (predictors) => set({ removedPredictors: predictors }),
    selectedModel: null,
    setSelectedModel: (model) => set({ selectedModel: model }),
    ...initialState,
  }));
};

export const usePreviewStore = (initialState) => {
  if (typeof window === 'undefined') {
    return initStore(initialState);
  }

  if (!store) {
    store = initStore(initialState);
  }

  return store;
};