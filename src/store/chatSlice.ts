import { StateCreator } from 'zustand';
import { ChatMessage } from '../types';
import { StoreState } from './index';

export interface ChatSlice {
  chatHistory: Record<string, ChatMessage[]>;
  getChatMessages: (noteId: string) => ChatMessage[];
  addChatMessage: (noteId: string, message: ChatMessage) => void;
  clearChatHistory: (noteId: string) => void;
}

export const createChatSlice: StateCreator<
  StoreState,
  [],
  [],
  ChatSlice
> = (set, get) => ({
  chatHistory: {},

  getChatMessages: (noteId) => {
    return get().chatHistory[noteId] || [];
  },

  addChatMessage: (noteId, message) => {
    set((state) => ({
      chatHistory: {
        ...state.chatHistory,
        [noteId]: [...(state.chatHistory[noteId] || []), message],
      },
    }));
  },

  clearChatHistory: (noteId) => {
    set((state) => {
      const { [noteId]: _, ...rest } = state.chatHistory;
      return { chatHistory: rest };
    });
  },
});