import React, { useState } from 'react'
import { Send, Bot, User, Edit2, Check, X } from 'lucide-react'
import { useChat, Message } from '@/hooks/useChat'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function App() {
  const { messages, isLoading, sendMessage, editMessage } = useChat()
  const [input, setInput] = useState('')
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null)
  const [editInput, setEditInput] = useState('')

  const handleSendMessage = () => {
    if (input.trim() === '') return
    sendMessage(input)
    setInput('')
  }

  const handleStartEdit = (id: number, content: string) => {
    setEditingMessageId(id)
    setEditInput(content)
  }

  const handleSaveEdit = (id: number) => {
    if (editInput.trim() === '') return
    editMessage(id, editInput)
    setEditingMessageId(null)
    setEditInput('')
  }

  const handleCancelEdit = () => {
    setEditingMessageId(null)
    setEditInput('')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">LLM Chatapp</h1>
      </header>
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
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
  isEditing: boolean
  onStartEdit: () => void
  editInput: string
  setEditInput: (input: string) => void
  onSaveEdit: () => void
  onCancelEdit: () => void
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isEditing,
  onStartEdit,
  editInput,
  setEditInput,
  onSaveEdit,
  onCancelEdit
}) => (
  <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
        message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
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
          <Button variant="ghost" size="sm" className="ml-2" onClick={onStartEdit}>
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
          <Button size="sm" variant="ghost" onClick={onCancelEdit} className="ml-1">
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <p>{message.content}</p>
      )}
    </div>
  </div>
)

const ThinkingBubble: React.FC = () => (
  <div className="flex justify-start">
    <div className="bg-secondary text-secondary-foreground rounded-lg p-3">
      <p>Thinking...</p>
    </div>
  </div>
)

interface ChatInputProps {
  input: string
  setInput: (input: string) => void
  handleSendMessage: () => void
  isLoading: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, handleSendMessage, isLoading }) => (
  <div className="border-t p-4">
    <div className="flex items-center">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        placeholder="Type your message..."
        className="flex-1 mr-2"
      />
      <Button onClick={handleSendMessage} disabled={isLoading}>
        <Send className="w-5 h-5" />
      </Button>
    </div>
  </div>
)

export default App