import React from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, handleSendMessage, isLoading }) => {
  return (
    <div className="border-t p-4 flex">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 mr-2"
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <Button onClick={handleSendMessage} disabled={isLoading}>
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};