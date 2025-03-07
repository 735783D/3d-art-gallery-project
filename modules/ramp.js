import * as THREE from 'three';
// Ramp setup
export function createRamp(scene, textureLoader) {
    const rampGroup = new THREE.Group();
    scene.add(rampGroup);   
    
    const ramp = new THREE.Mesh(
        new THREE.BoxGeometry(5, 0.1, 20),
        new THREE.MeshStandardMaterial({ color: 0x0000ff })
      );
      ramp.position.set(0, -1, -5);
      ramp.rotation.x = -Math.PI / 6; // Adjust angle as needed
      scene.add(ramp);

      rampGroup.add(ramp);

      return rampGroup;
}


