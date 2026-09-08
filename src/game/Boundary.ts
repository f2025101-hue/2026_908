import * as THREE from 'three';

export class Boundary {
  constructor(private readonly limit = 58) {}
  clamp(position: THREE.Vector3): void {
    position.x = THREE.MathUtils.clamp(position.x, -this.limit, this.limit);
    position.z = THREE.MathUtils.clamp(position.z, -this.limit, this.limit);
  }
}