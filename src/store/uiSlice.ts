import { StateCreator } from 'zustand';
import { StoreState } from './index';

export interface UISlice {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const createUISlice: StateCreator<
  StoreState,
  [],
  [],
  UISlice
> = (set) => ({
  isSidebarCollapsed: false,

  toggleSidebar: () => {
    set((state) => ({
      isSidebarCollapsed: !state.isSidebarCollapsed,
    }));
  },
});