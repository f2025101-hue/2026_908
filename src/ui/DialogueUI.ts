import type { DialogueChoice } from '../dialogue/DialogueManager';

export class DialogueUI {
  private readonly root: HTMLDivElement;
  private readonly speaker: HTMLHeadingElement;
  private readonly text: HTMLParagraphElement;
  private readonly choices: HTMLDivElement;
  constructor(onChoice: (choice: DialogueChoice) => void, onClose: () => void) {
    this.root = document.createElement('div'); this.root.className = 'dialogue-panel hidden';
    this.root.innerHTML = '<div class="dialogue-rule"></div>';
    this.speaker = document.createElement('h2'); this.text = document.createElement('p');
    this.choices = document.createElement('div'); this.choices.className = 'dialogue-choices';
    this.root.append(this.speaker, this.text, this.choices);
    const close = document.createElement('button'); close.className = 'dialogue-close'; close.textContent = '閉じる'; close.addEventListener('click', onClose);
    this.root.append(close); document.body.append(this.root); this.onChoice = onChoice;
  }
  private readonly onChoice: (choice: DialogueChoice) => void;
  show(node: { speaker: string; text: string; choices: DialogueChoice[] }): void {
    this.speaker.textContent = node.speaker; this.text.textContent = node.text; this.choices.replaceChildren();
    node.choices.forEach((choice, index) => {
      const button = document.createElement('button'); button.className = 'choice-button';
      button.innerHTML = `<span>0${index + 1}</span>${choice.label}`; button.addEventListener('click', () => this.onChoice(choice)); this.choices.append(button);
    });
    if (node.choices.length === 0) { const hint = document.createElement('div'); hint.className = 'dialogue-hint'; hint.textContent = '会話を閉じて、街を探索する'; this.choices.append(hint); }
    this.root.classList.remove('hidden');
  }
  hide(): void { this.root.classList.add('hidden'); }
}