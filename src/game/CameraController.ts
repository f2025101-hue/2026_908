import * as THREE from 'three';
import { Player } from './Player';

export type CameraMode = 'first' | 'third';

export class CameraController {
  mode: CameraMode = 'third';
  private readonly offset = new THREE.Vector3();
  constructor(private readonly camera: THREE.PerspectiveCamera, private readonly player: Player) {}
  toggle(): CameraMode { this.mode = this.mode === 'third' ? 'first' : 'third'; return this.mode; }
  update(): void {
    const position = this.player.position;
    if (this.mode === 'first') {
      this.camera.position.set(position.x, position.y + 1.65, position.z);
      this.camera.rotation.set(0, this.player.getYaw(), 0);
      return;
    }
    this.offset.set(0, 4.1, 7.4).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.getYaw());
    this.camera.position.copy(position).add(this.offset);
    this.camera.lookAt(position.x, position.y + 1, position.z);
  }
}