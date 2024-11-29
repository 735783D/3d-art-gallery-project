import * as THREE from 'three';

export function createBackWall(scene, textureLoader) {
    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 20, 0.001),
        new THREE.MeshBasicMaterial({color: 'orange'})
    );

    backWall.position.z = -25;
    scene.add(backWall);

    return backWall;
}