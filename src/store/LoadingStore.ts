import { create } from 'zustand';


export interface LoadingState {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

const loadingStore = create<LoadingState>((set) => ({
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),
}));

export default loadingStore;