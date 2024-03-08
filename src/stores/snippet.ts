import { create } from 'zustand';

type State = {
  searchTerm: string;
};

type Actions = {
  setSearchTerm: (searchTerm: string) => void;
};

const initialState: State = {
  searchTerm: ''
};

export const useSnippetStore = create<State & Actions>((set) => ({
  ...initialState,

  setSearchTerm: (searchTerm) => {
    set({ searchTerm: searchTerm });
  }
}));
