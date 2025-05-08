import { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../types';
import { StoreState } from './index';

export interface NoteSlice {
  notes: Note[];
  activeNoteId: string | null;
  getNoteById: (id: string) => Note | undefined;
  createNote: () => void;
  deleteNote: (id: string) => void;
  updateNoteTitle: (id: string, title: string) => void;
  updateNoteContent: (id: string, content: string) => void;
  setActiveNoteId: (id: string) => void;
}

export const createNoteSlice: StateCreator<
  StoreState,
  [],
  [],
  NoteSlice
> = (set, get) => ({
  notes: [],
  activeNoteId: null,

  getNoteById: (id) => {
    return get().notes.find((note) => note.id === id);
  },

  createNote: () => {
    const newNote: Note = {
      id: uuidv4(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      notes: [newNote, ...state.notes],
      activeNoteId: newNote.id,
    }));
  },

  deleteNote: (id) => {
    const { notes, activeNoteId } = get();
    const newNotes = notes.filter((note) => note.id !== id);

    // If we deleted the active note, set the first available note as active
    let newActiveNoteId = activeNoteId;
    if (activeNoteId === id) {
      newActiveNoteId = newNotes.length > 0 ? newNotes[0].id : null;
    }

    set({
      notes: newNotes,
      activeNoteId: newActiveNoteId,
    });
  },

  updateNoteTitle: (id, title) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              title,
              updatedAt: new Date().toISOString(),
            }
          : note
      ),
    }));
  },

  updateNoteContent: (id, content) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              content,
              updatedAt: new Date().toISOString(),
            }
          : note
      ),
    }));
  },

  setActiveNoteId: (id) => {
    set({ activeNoteId: id });
  },
});