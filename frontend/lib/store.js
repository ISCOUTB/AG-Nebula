import { create } from 'zustand';

// Creamos un store inicializado como null
let store = null;

// Función para inicializar el store
const initStore = (initialState = {}) => {
  return create((set) => ({
    preview: [],
    setPreview: (preview) => set({ preview }),
    ...initialState,
  }));
};

// Función para obtener o inicializar el store
export const usePreviewStore = (initialState) => {
  // Para SSR, siempre creamos un nuevo store
  if (typeof window === 'undefined') {
    return initStore(initialState);
  }

  // Para el cliente, creamos el store solo una vez
  if (!store) {
    store = initStore(initialState);
  }

  return store;
};