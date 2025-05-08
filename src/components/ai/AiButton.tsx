import React from 'react';
import { Bot } from 'lucide-react';
import clsx from 'clsx';

type AiButtonProps = {
  onClick: () => void;
  isActive: boolean;
};

export const AiButton: React.FC<AiButtonProps> = ({ onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'ai-button flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all',
        {
          'bg-blue-600 text-white hover:bg-blue-700': isActive,
          'bg-white text-blue-600 hover:bg-gray-100': !isActive,
        }
      )}
      aria-label={isActive ? 'Close AI chat' : 'Open AI chat'}
    >
      <Bot size={24} />
    </button>
  );
};