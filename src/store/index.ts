import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Note, ChatMessage } from '../types';
import { createNoteSlice, NoteSlice } from './noteSlice';
import { createChatSlice, ChatSlice } from './chatSlice';
import { createUISlice, UISlice } from './uiSlice';
import { persist } from 'zustand/middleware';

export type StoreState = NoteSlice & ChatSlice & UISlice;

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createNoteSlice(...a),
      ...createChatSlice(...a),
      ...createUISlice(...a),
    }),
    {
      name: 'notely-storage',
      partialize: (state) => ({
        notes: state.notes,
        chatHistory: state.chatHistory,
        activeNoteId: state.activeNoteId,
      }),
    }
  )
);