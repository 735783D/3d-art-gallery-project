import * as THREE from "three";

export const createCeiling = (scene, textureLoader) => {
    const ceilingTexture = textureLoader.load( './img/TAPE.png' );
    const ceilingGeometry = new THREE.PlaneGeometry(50, 50); 
    const ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture, side: THREE.DoubleSide});
    const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceilingPlane.rotation.x = Math.PI / 2;  // rotate the plane by 90 degrees around the y axis (x in Blender)  
    ceilingPlane.position.y = 10;   // rotate the plane by 90 degrees around the x axis (z in Blender)
    scene.add(ceilingPlane);
}