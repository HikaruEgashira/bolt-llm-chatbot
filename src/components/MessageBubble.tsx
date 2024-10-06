import React from 'react';
import { User, Bot, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Message } from '@/hooks/useChat';

interface MessageBubbleProps {
  message: Message;
  isEditing: boolean;
  onStartEdit: () => void;
  editInput: string;
  setEditInput: (value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isEditing,
  onStartEdit,
  editInput,
  setEditInput,
  onSaveEdit,
  onCancelEdit,
}) => (
  <div
    className={`flex ${
      message.role === 'user' ? 'justify-end' : 'justify-start'
    }`}
  >
    <div
      className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
        message.role === 'user'
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary text-secondary-foreground'
      }`}
    >
      <div className="flex items-center mb-2">
        {message.role === 'user' ? (
          <User className="w-5 h-5 mr-2" />
        ) : (
          <Bot className="w-5 h-5 mr-2" />
        )}
        <span className="font-semibold">
          {message.role === 'user' ? 'You' : 'Assistant'}
        </span>
        {message.role === 'user' && !isEditing && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-2"
            onClick={onStartEdit}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="flex items-center">
          <Input
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            className="flex-1 mr-2"
          />
          <Button size="sm" onClick={onSaveEdit}>
            <Check className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onCancelEdit}
            className="ml-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <p>{message.content}</p>
      )}
    </div>
  </div>
);
