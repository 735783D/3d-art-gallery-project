import * as THREE from 'three';
// import { paintingTestData } from './paintingTestData.js';

export const paintingTest = (scene) => {
    const textureLoader = new THREE.TextureLoader();

    const colorTexture1 = textureLoader.load( './img/floor.png' );
    colorTexture1.wrapS = colorTexture1.wrapT = THREE.RepeatWrapping;
    colorTexture1.repeat.set( 10, 10 );

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 'blue' }); 
    const geometry = new THREE.BoxGeometry(1,1,1); 
    const material = new THREE.MeshStandardMaterial({
        map: colorTexture1,
        // color: 'black',
        side: THREE.DoubleSide,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(-1,1,1);

    const colorTexture2 = textureLoader.load( './img/TAPE.png' );
    const material2 = new THREE.MeshStandardMaterial({
        map: colorTexture2,
        // color: 'black',
        side: THREE.DoubleSide,
    });
    // colorTexture2.wrapS = colorTexture2.wrapT = THREE.RepeatWrapping;
    // colorTexture2.repeat.set( 10, 10 );
 
    const cube2 = new THREE.Mesh(geometry, material2);
    cube2.position.set(-2,0,0);

    scene.add(cube, cube2);

return cube;
}

