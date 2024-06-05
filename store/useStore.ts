import { create } from 'zustand';

type ColorStore = {
  color: string;
  setColor: (color: string) => void;
};

const useColorStore = create<ColorStore>((set) => ({
  color: '#0f62fe',
  setColor: (color: string) => set({ color }),
}));

export default useColorStore;
