import * as THREE from "three";

export const setupFloor = (scene) => {
    const textureLoader = new THREE.TextureLoader();

    // Texture
    const colorTexture = textureLoader.load( './img/floor.png' );
    colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
    colorTexture.repeat.set( 10, 10 );

    // Create the plane
    const floorGeometry = new THREE.PlaneGeometry(50, 50); 
    const floorMaterial = new THREE.MeshStandardMaterial({
        map: colorTexture,
        // color: 'black',
        side: THREE.DoubleSide,
    });
    const floorPlane = new THREE.Mesh(floorGeometry, floorMaterial);
    floorPlane.rotation.x = Math.PI / 2;  // rotate the plane by 90 degrees around the y axis (x in Blender)  
    floorPlane.position.y = -Math.PI;   // rotate the plane by 90 degrees around the x axis (z in Blender)
    scene.add(floorPlane);
}