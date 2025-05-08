import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '../../store';
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { EditorToolbar } from './EditorToolbar';
import { AIChat } from '../ai/AIChat';
import { AiButton } from '../ai/AiButton';

export const NoteEditor: React.FC = () => {
  const { activeNoteId, updateNoteTitle, updateNoteContent, getNoteById } = useStore();
  const [title, setTitle] = useState('');
  const [showChat, setShowChat] = useState(false);
  
  const activeNote = getNoteById(activeNoteId!);

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
    }
  }, [activeNote]);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: activeNote?.content || '',
    onUpdate: ({ editor }) => {
      updateNoteContent(activeNoteId!, editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && activeNote) {
      if (editor.getHTML() !== activeNote.content) {
        editor.commands.setContent(activeNote.content);
      }
    }
  }, [activeNoteId, editor, activeNote]);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      setTitle(newTitle);
      updateNoteTitle(activeNoteId!, newTitle);
    },
    [activeNoteId, updateNoteTitle]
  );

  const toggleChat = useCallback(() => {
    setShowChat((prev) => !prev);
  }, []);

  if (!activeNote) return null;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-none border-b border-gray-200 p-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled Note"
          className="w-full border-none bg-transparent text-2xl font-semibold text-gray-800 outline-none placeholder:text-gray-400"
        />
      </div>

      <EditorToolbar editor={editor} />

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <EditorContent editor={editor} className="min-h-[calc(100%-80px)] prose max-w-none" />
      </div>

      {showChat && <AIChat noteId={activeNoteId!} onClose={toggleChat} />}

      <div className="absolute bottom-6 right-6">
        <AiButton onClick={toggleChat} isActive={showChat} />
      </div>
    </div>
  );
};
