import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, AIMessage } from '@langchain/core/messages'

class LangchainService {
  private llm: ChatOpenAI
  private history: (HumanMessage | AIMessage)[] = []

  constructor() {
    this.llm = new ChatOpenAI({
      openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
    })
  }

  async getResponse(input: string): Promise<string> {
    try {
      this.history.push(new HumanMessage(input))
      const response = await this.llm.invoke(this.history)
      this.history.push(response)
      return typeof response.content === 'string' ? response.content : JSON.stringify(response.content)
    } catch (error) {
      console.error('Error in LangchainService:', error)
      throw new Error('Failed to get response from LLM')
    }
  }
}

export const langchainService = new LangchainService()
