import * as THREE from 'three';
import { Boundary } from './Boundary';

export class Player {
  readonly object = new THREE.Group();
  readonly position = new THREE.Vector3(0, 0, 18);
  private readonly keys = new Set<string>();
  private readonly boundary = new Boundary();
  private yaw = Math.PI;
  private readonly body: THREE.Group;

  constructor() {
    this.body = new THREE.Group();
    const coat = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 1.05, 4, 10), new THREE.MeshStandardMaterial({ color: 0x263b3b, roughness: 0.85 }));
    coat.position.y = 1.05;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 8), new THREE.MeshStandardMaterial({ color: 0xc99478, roughness: 0.9 }));
    head.position.y = 1.9;
    this.body.add(coat, head);
    this.object.add(this.body);
    window.addEventListener('keydown', (event) => this.keys.add(event.key.toLowerCase()));
    window.addEventListener('keyup', (event) => this.keys.delete(event.key.toLowerCase()));
  }

  update(delta: number): void {
    const direction = new THREE.Vector3();
    if (this.keys.has('w')) direction.z -= 1;
    if (this.keys.has('s')) direction.z += 1;
    if (this.keys.has('a')) direction.x -= 1;
    if (this.keys.has('d')) direction.x += 1;
    if (direction.lengthSq() > 0) {
      direction.normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
      this.position.addScaledVector(direction, delta * 7.5);
      this.body.rotation.y = Math.atan2(direction.x, direction.z);
      this.boundary.clamp(this.position);
    }
    if (this.keys.has('q')) this.yaw += delta * 1.8;
    if (this.keys.has('e')) this.yaw -= delta * 1.8;
    this.object.position.copy(this.position);
  }

  getYaw(): number { return this.yaw; }
}