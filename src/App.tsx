import React from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { NoteEditor } from './components/notes/NoteEditor';
import { Sidebar } from './components/sidebar/Sidebar';
import { useStore } from './store';

function App() {
  const { activeNoteId } = useStore();

  return (
    <AppLayout>
      <Sidebar />
      <div className="flex-1 overflow-auto">
        {activeNoteId ? (
          <NoteEditor />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="max-w-md text-center">
              <h2 className="mb-2 text-2xl font-semibold text-gray-800">No note selected</h2>
              <p className="text-gray-600">
                Select a note from the sidebar or create a new one to get started.
              </p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default App;