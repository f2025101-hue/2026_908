import * as THREE from 'three';
import { NPC } from './NPC';

export class InteractionManager {
  constructor(private readonly npc: NPC, private readonly onInteract: () => void) {}
  isNear(playerPosition: THREE.Vector3): boolean { return playerPosition.distanceTo(this.npc.position) < 4.2; }
  interact(playerPosition: THREE.Vector3): void { if (this.isNear(playerPosition)) this.onInteract(); }
}