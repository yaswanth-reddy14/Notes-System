import React from 'react';
import { Editor } from '@tiptap/react';
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered 
} from 'lucide-react';
import clsx from 'clsx';

type ToolbarButtonProps = {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
};

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  onClick, 
  isActive, 
  children,
  title 
}) => (
  <button
    onClick={onClick}
    className={clsx(
      'rounded p-1 transition-colors',
      isActive 
        ? 'bg-gray-200 text-blue-600' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
    )}
    title={title}
  >
    {children}
  </button>
);

type EditorToolbarProps = {
  editor: Editor | null;
};

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-none items-center gap-1 border-b border-gray-200 bg-gray-50 px-4 py-2">
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Bold"
      >
        <Bold size={18} />
      </ToolbarButton>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Italic"
      >
        <Italic size={18} />
      </ToolbarButton>
      
      <div className="mx-2 h-5 w-px bg-gray-300" />
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </ToolbarButton>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </ToolbarButton>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
        title="Heading 3"
      >
        <Heading3 size={18} />
      </ToolbarButton>
      
      <div className="mx-2 h-5 w-px bg-gray-300" />
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <List size={18} />
      </ToolbarButton>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title="Ordered List"
      >
        <ListOrdered size={18} />
      </ToolbarButton>
    </div>
  );
};