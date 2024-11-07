import * as THREE from 'three';

export const cubeTest = (scene) => {    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 'red'});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(1,1,1);
    scene.add(cube);

return cube;
}