import { create } from 'zustand';

type ColorStore = {
  color: string;
  setColor: (color: string, overriden?: boolean) => void;
  overriden: boolean;
};

const useColorStore = create<ColorStore>((set) => ({
  color: '#0f62fe',
  setColor: (color: string, overriden?: boolean) => set({ color, overriden }),
  overriden: false,
}));

export default useColorStore;
