/**
 * Interface representing a source from Indian mythology
 */
export interface MythologySource {
  name: string;     // Name of the text (e.g., "Bhagavad Gita")
  type: string;     // Type of text (e.g., "Epic", "Vedic", etc.)
  section?: string; // Optional section or chapter reference
}

/**
 * Interface representing wisdom response to user's problem
 */
export interface WisdomResponse {
  wisdom: string;           // The wisdom advice text
  sources: MythologySource[]; // Sources of the wisdom
  problem: string;         // Original problem from the user
}
