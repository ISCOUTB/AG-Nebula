import {create} from "zustand";

const useDataInfoStore = create((set) => ({
    dataInfo: [],
    setDataInfo: (data) => set({dataInfo: data}),
    updateDataInfo: (data) => set((state) => ({dataInfo: [...state.dataInfo, data]}))
}))

export default useDataInfoStore;

