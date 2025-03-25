import OpenAI from 'openai';
import { MythologySource } from '../models/mythology';

export class WisdomService {
  private openai: OpenAI;
  
  constructor() {
    // Initialize OpenAI client
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  
  /**
   * Get wisdom from Indian mythology for a specific problem
   * @param problem The problem description from the user
   * @returns Wisdom object with advice and source references
   */
  async getWisdomForProblem(problem: string) {
    try {
      // Create system prompt with context about Indian mythology
      const systemPrompt = `You are a wise guide with deep knowledge of Indian mythology and scriptures including the Upanishads, Mahabharata, Ramayana, and Manusmriti. 

When responding to a person's problem, provide wisdom by:
1. Including at least one relevant Sanskrit shloka (verse) in Devanagari script from the appropriate text
2. Providing the transliteration of the shloka in Latin script
3. Explaining the meaning and context of the shloka in simple terms
4. Drawing from specific stories, characters, or teachings from these texts
5. Explicitly connecting the ancient wisdom to the modern problem with clear analogies
6. Providing practical advice based on these teachings
7. Citing the specific text, chapter, and verse number where the shloka comes from

Structure your response in this order:
- Brief introduction
- Sanskrit shloka in Devanagari
- Transliteration
- Translation and explanation
- Story or context from the text
- Analogy to the modern problem
- Practical advice

Be warm and compassionate in your responses while maintaining the depth and authenticity of the original teachings.`;

      // Get completion from OpenAI
      const response = await this.openai.chat.completions.create({
        model: "gpt-4-turbo", // Or another appropriate model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `I'm facing this problem in my life: ${problem}. Can you provide wisdom from Indian mythology to help me address this situation?` }
        ],
        temperature: 0.7,
        max_tokens: 1500
      });

      // Extract sources from the response
      const content = response.choices[0].message.content || '';
      const sources = this.extractSourcesFromResponse(content);
      
      return {
        wisdom: content,
        sources: sources,
        problem: problem
      };
    } catch (error) {
      console.error('Error in wisdom service:', error);
      throw error;
    }
  }
  
  /**
   * Extract mythology sources from AI response
   * This is a simple implementation that could be enhanced with more sophisticated parsing
   */
  private extractSourcesFromResponse(response: string): MythologySource[] {
    const sources: MythologySource[] = [];
    const textNames = ['Upanishad', 'Mahabharata', 'Ramayana', 'Manusmriti', 'Bhagavad Gita', 'Vedas'];
    
    // Simple extraction based on text mentions
    // This could be enhanced with more sophisticated NLP in the future
    textNames.forEach(name => {
      if (response.includes(name)) {
        sources.push({
          name: name,
          type: this.getSourceType(name)
        });
      }
    });
    
    return sources;
  }
  
  /**
   * Get the type of mythology source based on its name
   */
  private getSourceType(name: string): string {
    if (name.includes('Upanishad') || name.includes('Vedas')) return 'Vedic';
    if (name.includes('Mahabharata') || name.includes('Ramayana')) return 'Epic';
    if (name.includes('Manusmriti')) return 'Dharmaśāstra';
    if (name.includes('Bhagavad Gita')) return 'Philosophical';
    return 'Other';
  }
}
