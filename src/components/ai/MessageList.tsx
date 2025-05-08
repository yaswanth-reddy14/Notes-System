import React from 'react';
import { ChatMessage } from '../../types';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

type MessageListProps = {
  messages: ChatMessage[];
  isLoading: boolean;
};

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-center text-gray-500">
        <p>
          Ask me anything about your note.
          <br />
          I'm here to help!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div
          key={message.id}
          className={clsx('max-w-[80%] rounded-2xl px-4 py-2', {
            'chat-message-user': message.sender === 'user',
            'chat-message-ai': message.sender === 'ai',
          })}
        >
          <p>{message.content}</p>
        </div>
      ))}
      
      {isLoading && (
        <div className="chat-message-ai flex max-w-[80%] items-center gap-2 rounded-2xl px-4 py-2">
          <Loader2 size={16} className="animate-spin" />
          <p>Thinking...</p>
        </div>
      )}
    </div>
  );
};