import * as THREE from 'three';

export class NPC {
  readonly object = new THREE.Group();
  readonly position = new THREE.Vector3(-2, 0, 2);
  constructor() {
    const coat = new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 1.1, 4, 12), new THREE.MeshStandardMaterial({ color: 0xa96a4b, roughness: 0.8 }));
    coat.position.y = 1.08;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.27, 16, 10), new THREE.MeshStandardMaterial({ color: 0xd49b7e, roughness: 0.9 }));
    head.position.y = 1.93;
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.65), new THREE.MeshStandardMaterial({ color: 0x3e2926, roughness: 0.95 }));
    hair.position.y = 2.02;
    this.object.add(coat, head, hair);
    this.object.position.copy(this.position);
  }
}