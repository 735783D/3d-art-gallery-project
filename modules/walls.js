import * as THREE from "three";

export function createWalls(scene, textureLoader) {
    

    // Create the walls
    const wallGroup = new THREE.Group();
    scene.add(wallGroup);

    // // Front wall
    // const frontLeftWall = new THREE.Mesh(
    //     new THREE.BoxGeometry(10, 20, 10),
    //     new THREE.MeshBasicMaterial({color: 'blue'})
    // );

    // frontLeftWall.position.x = -10;
    // frontLeftWall.position.z = -10;

    // const frontRightWall = new THREE.Mesh(
    //     new THREE.BoxGeometry(10, 20, 10),
    //     new THREE.MeshBasicMaterial({color: 'blue'})
    // );

    // frontRightWall.position.x = 10;
    // frontRightWall.position.z = -10;

    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.001, 20, 50),
        new THREE.MeshBasicMaterial({color: 'green'})
    );

    rightWall.position.x = 25;

    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.001, 20, 50),
        new THREE.MeshBasicMaterial({color: 'green'})
    );

    leftWall.position.x = -25;

    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 20, 0.001),
        new THREE.MeshBasicMaterial({color: 'green'})
    );

    backWall.position.z = -25;

    // wallGroup.add(frontLeftWall, frontRightWall, rightWall, leftWall, backWall);
    wallGroup.add( rightWall, leftWall, backWall);

}