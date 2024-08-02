import { create } from 'zustand';

type ResumeStore = {
  name: string;
  setName: (name: string) => void;
  json: string;
  setJson: (name: string) => void;
  clear: () => void;
};

const useResumeStore = create<ResumeStore>((set) => ({
  name: '',
  setName: (name: string) => set({ name }),
  json: '',
  setJson: (json: string) => set({ json }),
  clear: () => {
    set({ name: '', json: '' });
  },
}));

export default useResumeStore;
