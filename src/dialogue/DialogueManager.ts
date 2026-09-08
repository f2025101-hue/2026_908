import dialogueData from '../data/dialogues.json';
import type { StoryFlag } from '../story/StoryManager';

export interface DialogueChoice { label: string; next: string; flag?: StoryFlag; }
interface DialogueNode { speaker: string; text: string; choices: DialogueChoice[]; }
type DialogueNodes = Record<string, DialogueNode>;

export class DialogueManager {
  private readonly nodes: DialogueNodes = dialogueData.chapter1 as DialogueNodes;
  start(id: string): DialogueNode { return this.nodes[id]; }
  choose(choice: DialogueChoice): DialogueNode | null { return this.nodes[choice.next] ?? null; }
}