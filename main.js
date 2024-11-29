import * as THREE from "three";             // import the THREE library
import { PointerLockControls } from "three-stdlib";
import { createWalls } from "./modules/walls";
import { createBackWall } from "./modules/backWall";
// import { createBackWallBoundingBox } from "./modules/boundingBox";
// import { createBoundingBoxes } from "./modules/boundingBox";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, // near clipping plane
    1000  // far clipping plane
);
scene.add(camera);
camera.position.z = 5; // move camera away from the canvas by 5 units

// Movement controls
const keys = {};



// Handle keydown and keyup events
window.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});
window.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});
// Function to handle player movement
const movementSpeed = 0.1;


const boxGeometry = new THREE.BoxGeometry(.05, .05, .05);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const boundingBox = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boundingBox);
boundingBox.position.copy(camera.position);
console.log(boundingBox);
const cameraBoundingBox = new THREE.Box3().setFromObject(camera);
// const otherBox = new THREE.Box3().setFromObject(backWallBBox);

// let cameraBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
// cameraBB.setFromObject(camera);
// console.log(cameraBB);

// camera.position.y = 20;          // move camera up by 5 units
// camera.rotateOnAxis(new THREE.Vector3(-.75, 0, 0), Math.PI / 2);  // rotate camera 90 degrees around y axis

const renderer = new THREE.WebGLRenderer({antialias: false}); // for smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1); // background color
document.body.appendChild(renderer.domElement); // add the renderer to the DOM

// Lights
// ambient light
const ambientLight = new THREE.AmbientLight(0x101010, 1.0); //color and intensity,distance
// ambientLight.position = camera.position; // light follows camera
scene.add(ambientLight);

// directional light
const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); //color and intensity
sunLight.position.y = 15;
scene.add(sunLight);
 


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 'black'});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);    // add the cube to the scene



// Controls
// Event listeners for the keys
// document.addEventListener('keydown', onKeyDown, false);

// Texture
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load( './img/floor.png' );
const hotTexture = textureLoader.load( './img/TAPE.png' );
colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
colorTexture.repeat.set( 10, 10 );
// hotTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
// hotTexture.repeat.set( 10, 10 );


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
//----------------------------------------
// const ceilingGeometry = new THREE.PlaneGeometry(50, 50); 
// const ceilingMaterial = new THREE.MeshStandardMaterial({
//     map: hotTexture,
//     // color: 'red',
//     side: THREE.DoubleSide,
// });
// const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
// ceilingPlane.rotation.x = Math.PI / 2;  // rotate the plane by 90 degrees around the y axis (x in Blender)  
// // ceilingPlane.rotation.y = Math.PI;
// ceilingPlane.position.y = 10;   // rotate the plane by 90 degrees around the x axis (z in Blender)
// scene.add(ceilingPlane);

const ceilingTexture = textureLoader.load( './img/TAPE.png' );
const ceilingGeometry = new THREE.PlaneGeometry(50, 50); 
const ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture, side: THREE.DoubleSide});
const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceilingPlane.rotation.x = Math.PI / 2;  // rotate the plane by 90 degrees around the y axis (x in Blender)  
ceilingPlane.position.y = 10;   // rotate the plane by 90 degrees around the x axis (z in Blender)
scene.add(ceilingPlane);

const spotLight = new THREE.SpotLight(0xdddddd, 1.0); //color and intensity
spotLight.position.set(0, 5, 0);
spotLight.intensity = 100;
spotLight.target = ceilingPlane;
scene.add(spotLight);

    // WALLS
//----------------------------------
// const walls = createWalls(scene, textureLoader);

const backWall = createBackWall(scene, textureLoader);

// Wall setup
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, visible: true }); // Invisible walls
const wallGeometry = new THREE.BoxGeometry(10, 5, 1);

// Create walls
const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
wall1.position.set(0, -1, -8);
scene.add(wall1);

const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
wall2.position.set(-5, -1, 0);
wall2.rotation.y = Math.PI / 2;
scene.add(wall2);

const walls = [wall1, wall2]; // Group walls for collision detection
// Ramp setup
const ramp = new THREE.Mesh(
    new THREE.BoxGeometry(5, 0.1, 20),
    new THREE.MeshStandardMaterial({ color: 0x0000ff })
  );
  ramp.position.set(0, -1, -5);
  ramp.rotation.x = -Math.PI / 6; // Adjust angle as needed
  scene.add(ramp);

  // Raycaster for ramps
const raycaster = new THREE.Raycaster();
const downwardDirection = new THREE.Vector3(0, -1, 0); // Downward ray direction
const rampObjects = [ramp]; // Objects to test for ramps


// // Create the walls
// const wallGroup = new THREE.Group();
// scene.add(wallGroup);

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

// const rightWall = new THREE.Mesh(
//     new THREE.BoxGeometry(0.001, 20, 50),
//     new THREE.MeshBasicMaterial({color: 'green'})
// );

// rightWall.position.x = 25;

// const leftWall = new THREE.Mesh(
//     new THREE.BoxGeometry(0.001, 20, 50),
//     new THREE.MeshBasicMaterial({color: 'green'})
// );

// leftWall.position.x = -25;

// const backWall = new THREE.Mesh(
//     new THREE.BoxGeometry(50, 20, 0.001),
//     new THREE.MeshBasicMaterial({color: 'green'})
// );

// backWall.position.z = -25;

// wallGroup.add(frontLeftWall, frontRightWall, rightWall, leftWall, backWall);

// // Bounding boxes
// for (let i = 0; i < wallGroup.children.length; i++) {
//     wallGroup.children[i].BBox = new THREE.Box3();
//     wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]);
// }
//----------------------------------

// createBackWallBoundingBox(backWall);
const bWBoxGeometry = new THREE.BoxGeometry(50, 20, 0.001);
const bWBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const bWBoxboundingBox = new THREE.Mesh(bWBoxGeometry, bWBoxMaterial);
const bWBoxBoundingBox = new THREE.Box3().setFromObject(bWBoxboundingBox);
scene.add(bWBoxboundingBox);
bWBoxboundingBox.position.copy(backWall.position);
console.log(bWBoxboundingBox);
// const bWBox = new THREE.Box3().setFromObject(bWBoxboundingBox);
// const backwallBBox = createBoundingBoxes(backWall);
// console.log(backwallBBox);

// Function to check for collisions with walls
function checkWallCollision(direction) {
    cameraBoundingBox.setFromObject(camera); // Update bounding box
    cameraBoundingBox.translate(direction); // Predict movement
  
    for (const wall of walls) {
      const wallBoundingBox = new THREE.Box3().setFromObject(wall);
      if (cameraBoundingBox.intersectsBox(wallBoundingBox)) {
        return true; // Collision detected
      }
    }
    return false; // No collision
  }

  function handleRampAndFloorDetection() {
    raycaster.set(camera.position, downwardDirection);
  
    // Combine ramp and floor objects for detection
    const objectsToTest = [...rampObjects, floorPlane];
    const intersects = raycaster.intersectObjects(objectsToTest);
  
    if (intersects.length > 0) {
      // Sort by distance to prioritize the closest surface
      intersects.sort((a, b) => a.distance - b.distance);
  
      // Set the player's height to the closest intersection point
      const closestIntersection = intersects[0];
      const surfaceHeight = closestIntersection.point.y;
      camera.position.y = surfaceHeight + 0.5; // Adjust height to match the surface
    } else {
      camera.position.y = 1; // Default height for when no surface is detected
    }
  }

function createPainting(imageURL, width, height, position) {
    const textureLoader = new THREE.TextureLoader();
    const paintingTexture = textureLoader.load(imageURL);
    const ptintingMaterial = new THREE.MeshBasicMaterial({
        map: paintingTexture,
    });
    const paintingGeometry = new THREE.PlaneGeometry(width, height);
    const painting = new THREE.Mesh(paintingGeometry, ptintingMaterial);
    painting.position.set(position.x, position.y, position.z);
    return painting;
}

const painting1 = createPainting(
    './artworks/finalGetsugaGrey.jpg', 
    10, 
    5, 
    new THREE.Vector3(10, 5, -20)
);
const painting2 = createPainting(
    './artworks/viduus.png', 
    10, 
    5, 
    new THREE.Vector3(-10, 5, -20)
);
scene.add(painting1, painting2);

// Controls
const controls = new PointerLockControls(camera, document.body);

// Lock the pointer (controls are activated) and hide the menu when the experience starts
function startExperience() {
    // Lock the pointer
    controls.lock();
    // Hide the menu
    hideMenu();
}

const playButton = document.getElementById('play_button');
playButton.addEventListener('click', startExperience);

function hideMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
}

// Show menu
function showMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'block';
}

controls.addEventListener('unlock', showMenu);

// Functions for keys
// function onKeyDown(event){
//     let keyCode = event.which;
//     // right arrow
//     if (keyCode === 39 || keyCode === 68) {
//         controls.moveRight(0.5);
//     // left arrow
//     } else if (keyCode === 37 || keyCode === 65) {
//         controls.moveRight(-0.5);
//     // up arrow
//     } else if (keyCode === 38 || keyCode === 87) {
//         controls.moveForward(0.5);
//     // down arrow
//     } else if (keyCode === 40 || keyCode === 83) {
//         controls.moveForward(-0.5);
//     }
// }
// function onKeyDown(event) {
//     switch(event.keyCode) {
//         case 37: // left arrow
//             camera.translateX(-0.5);
//             break;
//         case 38: // up arrow
//             camera.translateZ(-0.5);
//             break;
//         case 39: // right arrow
//             camera.translateX(0.5);
//             break;
//         case 40: // down arrow
//             camera.translateZ(0.5);
//             break;
//     }
// }

function handlePlayerMovement() {
    const forward = keys['w'];
    const backward = keys['s'];
    const left = keys['a'];
    const right = keys['d'];
  
    let moveDirection = new THREE.Vector3();
  
    if (forward) moveDirection.z -= movementSpeed;
    if (backward) moveDirection.z += movementSpeed;
    if (left) moveDirection.x -= movementSpeed;
    if (right) moveDirection.x += movementSpeed;
  
    if (moveDirection.length() > 0) {
      if (!checkWallCollision(moveDirection)) {
        camera.position.add(moveDirection);
      }
    }
  }
// Animation
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    handlePlayerMovement();

    handleRampAndFloorDetection();

    
    // cameraBoundingBox.setFromObject(boundingBox);
    // otherBox.setFromObject(backWallBBox);
    // try{
    //         if (boundingBox.intersectBox(backWallBBox)) {
    //     // camera.translateZ(0.5);
    //     // camera.position.z += 0.5;
    //     // camera.translateZ(-0.5);
    //     console.log("collide");
    // }
    // } catch (error) {
    //     console.log(error);
    // }

    renderer.render(scene, camera);
}

animate();

//_____________________________________________________________________
// import * as THREE from 'three';

// let scene, camera, renderer, player, playerSpeed, stepHeightThreshold;
// playerSpeed = 0.1;
// stepHeightThreshold = 0.3; // Adjust as needed for step height

// function init() {
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     // Create a floor and stairs
//     const floorGeometry = new THREE.PlaneGeometry(10, 10);
//     const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
//     const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//     floor.rotation.x = -Math.PI / 2;
//     scene.add(floor);

//     const stepGeometry = new THREE.BoxGeometry(1, 0.2, 2);
//     const stepMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
//     for (let i = 0; i < 5; i++) {
//         const step = new THREE.Mesh(stepGeometry, stepMaterial);
//         step.position.set(i - 2, i * 0.2, -3);
//         scene.add(step);
//     }

//     // Create player
//     const playerGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
//     const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     player = new THREE.Mesh(playerGeometry, playerMaterial);
//     player.position.y = 0.5;
//     scene.add(player);

//     camera.position.z = 5;
// }

// function animate() {
//     requestAnimationFrame(animate);

//     // Player movement
//     if (keyDown['ArrowUp']) player.position.z -= playerSpeed;
//     if (keyDown['ArrowDown']) player.position.z += playerSpeed;

//     // Raycasting to check for steps
//     const raycaster = new THREE.Raycaster(player.position, new THREE.Vector3(0, -1, 0));
//     const intersects = raycaster.intersectObjects(scene.children, true);

//     if (intersects.length > 0 && intersects[0].distance < stepHeightThreshold) {
//         // Adjust the player's height to step up
//         player.position.y += 0.05;
//     } else {
//         player.position.y -= 0.05; // Apply gravity when not stepping
//     }

//     renderer.render(scene, camera);
// }

// // Movement Controls
// const keyDown = {};
// window.addEventListener('keydown', (event) => keyDown[event.key] = true);
// window.addEventListener('keyup', (event) => keyDown[event.key] = false);

// init();
// animate();

//____________________________________________________________________
// // GOOD ONE!!
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// // Scene setup
// const scene = new THREE.Scene();

// // Camera setup
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(10, 10, 20);
// camera.lookAt(0, 0, 0);

// // Renderer setup
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Controls setup (OrbitControls)
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

// // Lighting
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(10, 10, 10);
// scene.add(light);

// // Wall setup
// const wallGeometry = new THREE.BoxGeometry(10, 5, 1); // Adjust size as needed
// const wallMaterial = new THREE.MeshStandardMaterial({
//   color: 0xff0000,
//   visible: true, // Invisible walls
// });

// // Create walls
// const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
// wall1.position.set(0, 2.5, -5);
// scene.add(wall1);

// const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
// wall2.position.set(-5, 2.5, 0);
// wall2.rotation.y = Math.PI / 2;
// scene.add(wall2);

// // Group walls for collision detection
// const walls = [wall1, wall2];



// // Ramp (angled plane)
// const rampGeometry = new THREE.PlaneGeometry(10, 10);
// const rampMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide, visible: true });
// const ramp = new THREE.Mesh(rampGeometry, rampMaterial);
// ramp.rotation.x = -Math.PI / 3; // Angle the ramp
// scene.add(ramp);

// const planeGeometry = new THREE.PlaneGeometry(10, 10);
// const planeMaterial = new THREE.MeshStandardMaterial({ color: "red", side: THREE.DoubleSide });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = -Math.PI / 2;
// scene.add(plane);

// const plane2Geometry = new THREE.PlaneGeometry(10, 10);
// const plane2Material = new THREE.MeshStandardMaterial({ color: "red", side: THREE.DoubleSide });
// const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
// plane2.rotation.x = Math.PI/2;
// plane2.position.y = 0.3;
// plane2.position.z = -2;
// scene.add(plane2);

// const plane3Geometry = new THREE.PlaneGeometry(10, 10);
// const plane3Material = new THREE.MeshStandardMaterial({ color: "yellow", side: THREE.DoubleSide });
// const plane3 = new THREE.Mesh(plane3Geometry, plane3Material);
// plane3.rotation.x = Math.PI/3;
// plane3.position.y = 0.1;
// plane3.position.z = 3;
// scene.add(plane3);

// // Player (box)
// // const player = new THREE.Mesh(
// //   new THREE.BoxGeometry(1, 1, 1),
// //   new THREE.MeshStandardMaterial({ color: "blue" })
// // );
// const player = new THREE.Mesh(
//   new THREE.SphereGeometry(0.5, 32, 32),
//   new THREE.MeshStandardMaterial({ color: "blue" })
// )
// player.position.set(0, 6, 3); // Start above the ramp
// scene.add(player);

// // Player bounding box
// const playerBoundingBox = new THREE.Box3().setFromObject(player);

// // Raycaster for collision detection
// const raycaster = new THREE.Raycaster();
// const downDirection = new THREE.Vector3(0, -1, 0); // Raycast downwards

// // Function to check for collisions
// function checkCollision(direction) {
//   playerBoundingBox.setFromObject(player); // Update bounding box
//   playerBoundingBox.translate(direction); // Move bounding box in the intended direction

//   for (const wall of walls) {
//     const wallBoundingBox = new THREE.Box3().setFromObject(wall);
//     if (playerBoundingBox.intersectsBox(wallBoundingBox)) {
//       return true; // Collision detected
//     }
//   }
//   return false; // No collision
// }

// // Player movement state
// const movement = {
//   forward: false,
//   backward: false,
//   left: false,
//   right: false,
// };

// // Add keyboard controls
// window.addEventListener('keydown', (event) => {
//   if (event.key === 'w') movement.forward = true;
//   if (event.key === 's') movement.backward = true;
//   if (event.key === 'a') movement.left = true;
//   if (event.key === 'd') movement.right = true;
// });

// window.addEventListener('keyup', (event) => {
//   if (event.key === 'w') movement.forward = false;
//   if (event.key === 's') movement.backward = false;
//   if (event.key === 'a') movement.left = false;
//   if (event.key === 'd') movement.right = false;
// });

// // Animation loop
// const speed = 0.1; // Movement speed

// function animate() {
//   requestAnimationFrame(animate);

//   // Move the player
//   if (movement.forward) player.position.z -= speed;
//   if (movement.backward) player.position.z += speed;
//   if (movement.left) player.position.x -= speed;
//   if (movement.right) player.position.x += speed;

//   // Cast ray from player's position downwards
//   raycaster.set(player.position, downDirection);
//   const intersects = raycaster.intersectObjects([ramp, plane, plane2, plane3]);

//   // Check if the ray intersects the ramp
//   if (intersects.length > 0) {
//     const intersectPoint = intersects[0].point;
//     player.position.y = intersectPoint.y + 0.5; // Adjust height (+0.5 for offset)
//   } else {
//     // Simulate gravity
//     player.position.y -= 0.1; // Gravity effect
//   }

//   // Update controls
//   controls.update();

//   // Render the scene
//   renderer.render(scene, camera);
// }

// animate();

// // Handle window resizing
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });
//_____________________________________________________________________
// // IMPROVED!!
// import * as THREE from 'three';

// // Scene setup
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Player setup
// const player = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshStandardMaterial({ color: 0x00ff00 })
// );
// scene.add(player);
// player.position.y = 1; // Set initial height

// // Light setup
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(10, 10, 10);
// scene.add(light);

// // Floor setup
// const floor = new THREE.Mesh(
//   new THREE.PlaneGeometry(20, 20),
//   new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
// );
// floor.rotation.x = -Math.PI / 2;
// scene.add(floor);

// // Ramp setup
// const ramp = new THREE.Mesh(
//   new THREE.BoxGeometry(5, 1, 10),
//   new THREE.MeshStandardMaterial({ color: 0x0000ff })
// );
// ramp.position.set(0, 0.5, -5);
// ramp.rotation.x = -Math.PI / 6; // Adjust angle as needed
// scene.add(ramp);

// const ramp2 = new THREE.Mesh(
//   new THREE.BoxGeometry(5, 1, 10),
//   new THREE.MeshStandardMaterial({ color: 0x0000ff })
// );
// ramp2.position.set(0, 0.5, 5);
// ramp2.rotation.x = Math.PI / 6; // Adjust angle as needed
// scene.add(ramp2);

// // Wall setup
// const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, visible: true }); // Invisible walls
// const wallGeometry = new THREE.BoxGeometry(10, 5, 1);

// // Create walls
// const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
// wall1.position.set(0, 2.5, -8);
// scene.add(wall1);

// const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
// wall2.position.set(-5, 2.5, 0);
// wall2.rotation.y = Math.PI / 2;
// scene.add(wall2);

// const walls = [wall1, wall2]; // Group walls for collision detection

// // Player bounding box
// const playerBoundingBox = new THREE.Box3().setFromObject(player);

// // Raycaster for ramps
// const raycaster = new THREE.Raycaster();
// const downwardDirection = new THREE.Vector3(0, -1, 0); // Downward ray direction
// const rampObjects = [ramp, ramp2]; // Objects to test for ramps

// // Movement controls
// const keys = {};

// // Handle keydown and keyup events
// window.addEventListener('keydown', (event) => {
//   keys[event.key] = true;
// });
// window.addEventListener('keyup', (event) => {
//   keys[event.key] = false;
// });

// // Function to check for collisions with walls
// function checkWallCollision(direction) {
//   playerBoundingBox.setFromObject(player); // Update bounding box
//   playerBoundingBox.translate(direction); // Predict movement

//   for (const wall of walls) {
//     const wallBoundingBox = new THREE.Box3().setFromObject(wall);
//     if (playerBoundingBox.intersectsBox(wallBoundingBox)) {
//       return true; // Collision detected
//     }
//   }
//   return false; // No collision
// }

// // Function to handle player movement
// const movementSpeed = 0.1;

// function handlePlayerMovement() {
//   const forward = keys['w'];
//   const backward = keys['s'];
//   const left = keys['a'];
//   const right = keys['d'];

//   let moveDirection = new THREE.Vector3();

//   if (forward) moveDirection.z -= movementSpeed;
//   if (backward) moveDirection.z += movementSpeed;
//   if (left) moveDirection.x -= movementSpeed;
//   if (right) moveDirection.x += movementSpeed;

//   if (moveDirection.length() > 0) {
//     if (!checkWallCollision(moveDirection)) {
//       player.position.add(moveDirection);
//     }
//   }
// }

// // Function to handle ramps using raycaster
// function handleRampDetection() {
//   raycaster.set(player.position, downwardDirection);
//   const intersects = raycaster.intersectObjects(rampObjects);

//   if (intersects.length > 0) {
//     const closestIntersection = intersects[0];
//     const rampHeight = closestIntersection.point.y;
//     player.position.y = rampHeight + 0.5; // Adjust height to match ramp
//   } else {
//     player.position.y = 1; // Reset to floor level if no ramp
//   }
// }

// // Animation loop
// function animate() {
//   requestAnimationFrame(animate);

//   handlePlayerMovement();
//   handleRampDetection();

//   camera.position.set(player.position.x, player.position.y + 5, player.position.z + 10);
//   camera.lookAt(player.position);

//   renderer.render(scene, camera);
// }

// animate();
//_____________________________________________________________________
