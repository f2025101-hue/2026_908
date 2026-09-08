import * as THREE from 'three';
import { CameraController } from './CameraController';
import { DialogueManager } from '../dialogue/DialogueManager';
import { DialogueUI } from '../ui/DialogueUI';
import { InteractionManager } from './InteractionManager';
import { Player } from './Player';
import { StoryManager } from '../story/StoryManager';
import { World } from './World';

export class Game {
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 160);
  private readonly renderer = new THREE.WebGLRenderer({ antialias: true });
  private readonly player = new Player();
  private readonly world = new World();
  private readonly cameraController = new CameraController(this.camera, this.player);
  private readonly story = new StoryManager();
  private readonly dialogue = new DialogueManager();
  private readonly dialogueUI: DialogueUI;
  private readonly interaction: InteractionManager;
  private readonly modeLabel: HTMLElement;
  private readonly prompt: HTMLElement;
  private lastTime = performance.now();
  private talking = false;

  constructor(private readonly root: HTMLElement) {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); this.renderer.setSize(window.innerWidth, window.innerHeight); this.renderer.shadowMap.enabled = true; root.append(this.renderer.domElement);
    this.modeLabel = document.querySelector('#camera-mode')!; this.prompt = document.querySelector('#interaction-prompt')!;
    this.dialogueUI = new DialogueUI((choice) => { if (choice.flag) this.story.set(choice.flag); const node = this.dialogue.choose(choice); if (node) this.dialogueUI.show(node); }, () => this.closeDialogue());
    this.interaction = new InteractionManager(this.world.ichika, () => this.startDialogue()); this.world.build(this.scene); this.scene.add(this.player.object);
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('keydown', (event) => { if (event.key.toLowerCase() === 'v') this.toggleCamera(); if (event.key.toLowerCase() === 'f' && !this.talking) this.interaction.interact(this.player.position); if (event.key === 'Escape' && this.talking) this.closeDialogue(); });
    this.updateHud(); requestAnimationFrame((time) => this.loop(time));
  }

  private loop(time: number): void {
    const delta = Math.min((time - this.lastTime) / 1000, 0.05); this.lastTime = time;
    if (!this.talking) this.player.update(delta); this.cameraController.update(); this.updateHud(); this.renderer.render(this.scene, this.camera); requestAnimationFrame((nextTime) => this.loop(nextTime));
  }
  private startDialogue(): void { if (this.talking || this.story.has('metIchika')) return; this.talking = true; this.story.set('metIchika'); this.dialogueUI.show(this.dialogue.start('start')); }
  private closeDialogue(): void { this.talking = false; this.dialogueUI.hide(); }
  private toggleCamera(): void { const mode = this.cameraController.toggle(); this.modeLabel.textContent = mode === 'first' ? 'FIRST PERSON' : 'THIRD PERSON'; }
  private updateHud(): void { this.prompt.classList.toggle('visible', this.interaction.isNear(this.player.position) && !this.talking); }
  private resize(): void { this.camera.aspect = window.innerWidth / window.innerHeight; this.camera.updateProjectionMatrix(); this.renderer.setSize(window.innerWidth, window.innerHeight); }
}