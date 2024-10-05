import { useState } from 'react'
import { langchainService } from '../services/langchainService'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (input: string) => {
    if (input.trim() === '') return

    setMessages(prevMessages => [...prevMessages, { role: 'user', content: input }])
    setIsLoading(true)

    try {
      const response = await langchainService.getResponse(input)
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: response }
      ])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: 'Sorry, there was an error processing your request.' }
      ])
    }

    setIsLoading(false)
  }

  const editMessage = async (id: number, newContent: string) => {
    setMessages(prevMessages => {
      const updatedMessages = prevMessages.map((msg, index) => 
        index === id ? { ...msg, content: newContent } : msg
      )
      // Keep only messages up to and including the edited message
      return updatedMessages.slice(0, id + 1)
    })

    // If the edited message is not the last one, generate a new response
    if (id < messages.length - 1) {
      setIsLoading(true)
      try {
        const response = await langchainService.getResponse(newContent)
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'assistant', content: response }
        ])
      } catch (error) {
        console.error('Error:', error)
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'assistant', content: 'Sorry, there was an error processing your request.' }
        ])
      }
      setIsLoading(false)
    }
  }

  return {
    messages,
    isLoading,
    sendMessage,
    editMessage
  }
}