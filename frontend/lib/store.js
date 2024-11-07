import { create } from 'zustand';

let store = null;

const defaultInitialState = {
  preview: { header: [], first_rows: [] },
  selectedOutcome: null,
  selectedPredictors: [],
  removedPredictors: [],
  selectedModel: '',
};

const initStore = (initialState = {}) => {
  return create((set) => ({
    ...defaultInitialState,
    ...initialState,
    setPreview: (preview) => set({ preview }),
    setSelectedOutcome: (outcome) => set({ selectedOutcome: outcome }),
    setSelectedPredictors: (predictors) => set({ selectedPredictors: predictors }),
    setRemovedPredictors: (predictors) => set({ removedPredictors: predictors }),
    setSelectedModel: (model) => set({ selectedModel: model }),
    reset: () => set(defaultInitialState),
  }));
};

export const usePreviewStore = (initialState = defaultInitialState) => {
  if (typeof window === 'undefined') {
    return initStore(initialState);
  }

  if (!store) {
    store = initStore(initialState);

    // Verificar si la página se ha recargado
    if (localStorage.getItem('storeReset') === 'true') {
      store.getState().reset();
      localStorage.removeItem('storeReset');
    }

    // Establecer un indicador cuando la página se está recargando
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('storeReset', 'true');
    });
  }

  return store;
};
