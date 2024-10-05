import { OpenAI } from 'langchain/llms/openai'
import { ConversationChain } from 'langchain/chains'

class LangchainService {
  private llm: OpenAI
  private chain: ConversationChain

  constructor() {
    this.llm = new OpenAI({ openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY })
    this.chain = new ConversationChain({ llm: this.llm })
  }

  async getResponse(input: string): Promise<string> {
    try {
      const response = await this.chain.call({ input })
      return response.response
    } catch (error) {
      console.error('Error in LangchainService:', error)
      throw new Error('Failed to get response from LLM')
    }
  }
}

export const langchainService = new LangchainService()