import * as THREE from 'three';
import { NPC } from './NPC';

const materials = {
  road: new THREE.MeshStandardMaterial({ color: 0x353c3a, roughness: 0.98 }),
  sidewalk: new THREE.MeshStandardMaterial({ color: 0x8b9086, roughness: 1 }),
  wall: new THREE.MeshStandardMaterial({ color: 0xb3aa91, roughness: 0.9 }),
  roof: new THREE.MeshStandardMaterial({ color: 0x5b5048, roughness: 0.95 }),
  plant: new THREE.MeshStandardMaterial({ color: 0x49634a, roughness: 1 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x6b5140, roughness: 1 }),
  light: new THREE.MeshStandardMaterial({ color: 0xffdc9b, emissive: 0x8a5a27, emissiveIntensity: 0.45 })
};

function box(size: THREE.Vector3, material: THREE.Material, position: THREE.Vector3): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z), material);
  mesh.position.copy(position); mesh.castShadow = true; mesh.receiveShadow = true; return mesh;
}

function building(scene: THREE.Scene, x: number, z: number, width: number, depth: number, label: string): void {
  const group = new THREE.Group();
  group.add(box(new THREE.Vector3(width, 5, depth), materials.wall, new THREE.Vector3(0, 2.5, 0)));
  const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(width, depth) * 0.73, 2.2, 4), materials.roof);
  roof.rotation.y = Math.PI / 4; roof.position.y = 6.1; group.add(roof);
  for (let i = -1; i <= 1; i++) group.add(box(new THREE.Vector3(0.9, 1.3, 0.08), new THREE.MeshStandardMaterial({ color: 0x344b50, roughness: 0.5 }), new THREE.Vector3(i * width * 0.27, 2.7, depth / 2 + 0.04)));
  const sign = box(new THREE.Vector3(Math.min(width * 0.7, 4), 0.65, 0.08), new THREE.MeshStandardMaterial({ color: 0xe0c06b, roughness: 0.7 }), new THREE.Vector3(0, 4.2, depth / 2 + 0.08));
  sign.name = label; group.add(sign); group.position.set(x, 0, z); scene.add(group);
}

function tree(scene: THREE.Scene, x: number, z: number): void {
  const group = new THREE.Group();
  group.add(box(new THREE.Vector3(0.28, 2.2, 0.28), materials.wood, new THREE.Vector3(0, 1.1, 0)));
  const crown = new THREE.Mesh(new THREE.SphereGeometry(1.25, 10, 8), materials.plant); crown.position.y = 2.7; group.add(crown);
  group.position.set(x, 0, z); scene.add(group);
}

function streetLamp(scene: THREE.Scene, x: number, z: number): void {
  const group = new THREE.Group();
  group.add(box(new THREE.Vector3(0.12, 4.4, 0.12), materials.wood, new THREE.Vector3(0, 2.2, 0)));
  group.add(box(new THREE.Vector3(0.75, 0.11, 0.11), materials.wood, new THREE.Vector3(0.3, 4.35, 0)));
  group.add(box(new THREE.Vector3(0.35, 0.25, 0.35), materials.light, new THREE.Vector3(0.62, 4.2, 0)));
  group.position.set(x, 0, z); scene.add(group);
}

export class World {
  readonly ichika = new NPC();
  build(scene: THREE.Scene): void {
    scene.background = new THREE.Color(0xb7c3bd); scene.fog = new THREE.Fog(0xb7c3bd, 38, 105);
    scene.add(new THREE.HemisphereLight(0xdbe7e2, 0x59645c, 2.1));
    const sun = new THREE.DirectionalLight(0xffe8c2, 2.4); sun.position.set(-18, 32, 12); sun.castShadow = true; scene.add(sun);
    scene.add(box(new THREE.Vector3(120, 0.2, 120), new THREE.MeshStandardMaterial({ color: 0x6e806e, roughness: 1 }), new THREE.Vector3(0, -0.1, 0)));
    scene.add(box(new THREE.Vector3(120, 0.2, 11), materials.road, new THREE.Vector3(0, 0.02, 8)));
    scene.add(box(new THREE.Vector3(11, 0.2, 120), materials.road, new THREE.Vector3(8, 0.03, 0)));
    scene.add(box(new THREE.Vector3(120, 0.12, 1.3), materials.sidewalk, new THREE.Vector3(0, 0.09, 1.5)));
    scene.add(box(new THREE.Vector3(1.3, 0.12, 120), materials.sidewalk, new THREE.Vector3(1.5, 0.09, 0)));
    building(scene, -17, -7, 12, 9, '商店'); building(scene, 22, -8, 13, 10, '学校'); building(scene, -18, 23, 11, 10, '病院'); building(scene, 23, 23, 12, 9, '住宅');
    for (const [x, z] of [[-9, 11], [15, 14], [-13, 30], [16, -1], [-28, 4]]) tree(scene, x, z);
    for (const [x, z] of [[-5, 2], [12, 2], [-4, 15], [12, 19], [-25, 11]]) streetLamp(scene, x, z);
    scene.add(box(new THREE.Vector3(15, 0.08, 12), new THREE.MeshStandardMaterial({ color: 0x80966f, roughness: 1 }), new THREE.Vector3(28, 0.05, 7)));
    scene.add(box(new THREE.Vector3(3, 0.35, 0.45), materials.wood, new THREE.Vector3(28, 0.5, 7)));
    scene.add(this.ichika.object);
  }
}