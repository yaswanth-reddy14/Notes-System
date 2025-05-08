import React from 'react';
import clsx from 'clsx';
import { FileText } from 'lucide-react';
import { format } from 'date-fns';
import { Note } from '../../types';

type NoteItemProps = {
  note: Note;
  isActive: boolean;
  onClick: () => void;
};

export const NoteItem: React.FC<NoteItemProps> = ({ note, isActive, onClick }) => {
  return (
    <div
      className={clsx(
        'flex cursor-pointer items-center rounded-md px-3 py-2 transition-colors',
        {
          'bg-blue-100 text-blue-800': isActive,
          'hover:bg-gray-200': !isActive,
        }
      )}
      onClick={onClick}
    >
      <FileText
        size={16}
        className={clsx('mr-2', {
          'text-blue-600': isActive,
          'text-gray-500': !isActive,
        })}
      />
      <div className="flex-1 overflow-hidden">
        <div className="truncate font-medium">
          {note.title || 'Untitled Note'}
        </div>
        <div className="truncate text-xs text-gray-500">
          {format(new Date(note.updatedAt), 'MMM d, yyyy')}
        </div>
      </div>
    </div>
  );
};