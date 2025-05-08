import React from 'react';
import { FilePlus, Menu, Trash2 } from 'lucide-react';
import { useStore } from '../../store';
import { NoteItem } from './NoteItem';
import { format } from 'date-fns';

export const Sidebar: React.FC = () => {
  const {
    notes,
    activeNoteId,
    createNote,
    setActiveNoteId,
    deleteNote,
    isSidebarCollapsed,
    toggleSidebar,
  } = useStore();

  if (isSidebarCollapsed) {
    return (
      <div className="flex h-full w-16 flex-col border-r border-gray-200 bg-gray-50">
        <div className="flex h-14 items-center justify-center border-b border-gray-200">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="Expand sidebar"
          >
            <Menu size={20} />
          </button>
        </div>
        <div className="flex flex-1 flex-col p-2">
          <button
            onClick={createNote}
            className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"
            aria-label="Create new note"
          >
            <FilePlus size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-gray-50 transition-all duration-300">
      <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
        <h1 className="text-lg font-semibold text-gray-800">Notes</h1>
        <button
          onClick={toggleSidebar}
          className="p-1 text-gray-500 hover:text-gray-700"
          aria-label="Collapse sidebar"
        >
          <Menu size={20} />
        </button>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto p-3">
        <button
          onClick={createNote}
          className="mb-4 flex w-full items-center justify-center rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          <FilePlus size={18} className="mr-2" />
          <span>New Note</span>
        </button>

        <div className="space-y-1">
          {notes.length === 0 ? (
            <div className="py-4 text-center text-sm text-gray-500">
              No notes yet. Create your first note!
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="group relative">
                <NoteItem
                  note={note}
                  isActive={activeNoteId === note.id}
                  onClick={() => setActiveNoteId(note.id)}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="absolute right-2 top-1/2 hidden -translate-y-1/2 transform rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-red-500 group-hover:block"
                  aria-label="Delete note"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="border-t border-gray-200 bg-gray-100 p-3 text-center text-xs text-gray-500">
        Last synced: {format(new Date(), 'MMM d, yyyy h:mm a')}
      </div>
    </div>
  );
};