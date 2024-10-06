import { useState } from 'react';
import { MessageSquare, Plus, ChevronRight } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/ui/button';
import { MessageBubble } from '@/components/MessageBubble';
import { ThinkingBubble } from '@/components/ThinkingBubble';
import { ChatInput } from '@/components/ChatInput';

function App() {
  const { messages, isLoading, sendMessage, editMessage } = useChat();
  const [input, setInput] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState('');
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    sendMessage(input);
    setInput('');
  };

  const handleStartEdit = (id: number, content: string) => {
    setEditingMessageId(id);
    setEditInput(content);
  };

  const handleSaveEdit = (id: number) => {
    if (editInput.trim() === '') return;
    editMessage(id, editInput);
    setEditingMessageId(null);
    setEditInput('');
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditInput('');
  };

  return (
    <div className="flex h-screen bg-background">
      <nav
        className={`border-r p-4 flex flex-col transition-all duration-300 ease-in-out ${
          isNavExpanded ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={() => setIsNavExpanded(true)}
        onMouseLeave={() => setIsNavExpanded(false)}
      >
        <div className="flex items-center mb-6 overflow-hidden">
          <MessageSquare className="w-6 h-6 flex-shrink-0" />
          <span
            className={`ml-2 text-lg font-semibold whitespace-nowrap transition-opacity duration-200 ${
              isNavExpanded ? 'opacity-100 delay-200' : 'opacity-0'
            }`}
          >
            LLM Chat
          </span>
        </div>
        <Button
          variant="ghost"
          className="justify-start mb-4 overflow-hidden px-0"
        >
          <Plus className="w-5 h-5 flex-shrink-0 mr-2" />
          <span
            className={`whitespace-nowrap transition-opacity duration-200 ${
              isNavExpanded ? 'opacity-100 delay-200' : 'opacity-0'
            }`}
          >
            New Chat
          </span>
        </Button>
        <div className="flex-grow overflow-y-auto">
          <div
            className={`space-y-2 transition-opacity duration-200 ${
              isNavExpanded ? 'opacity-100 delay-200' : 'opacity-0'
            }`}
          >
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Recent Chats
            </div>
            {[...Array(5)].map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start px-0"
              >
                <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  Chat {index + 1}
                </span>
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-auto text-xs text-muted-foreground flex items-center overflow-hidden">
          {isNavExpanded ? (
            <span
              className={`transition-opacity duration-200 ${
                isNavExpanded ? 'opacity-100 delay-200' : 'opacity-0'
              }`}
            >
              Powered by OpenAI
            </span>
          ) : (
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
          )}
        </div>
      </nav>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              isEditing={editingMessageId === index}
              onStartEdit={() => handleStartEdit(index, message.content)}
              editInput={editInput}
              setEditInput={setEditInput}
              onSaveEdit={() => handleSaveEdit(index)}
              onCancelEdit={handleCancelEdit}
            />
          ))}
          {isLoading && <ThinkingBubble />}
        </div>
        <ChatInput
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;
