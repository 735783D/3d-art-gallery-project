//**********Wall collisions experiment*********
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { floor, MeshStandardMaterial } from 'three/tsl';
// import { loadStairsModel } from '../modules/stairs';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1); // Sets the screen color's background
document.body.appendChild(renderer.domElement);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
// directionalLight.position.set(0, 100, 0);
// scene.add(directionalLight);
// scene.attach(directionalLight); // Ensures it's in the world and not moving with another object




// Player (camera is treated as part of the player)
const player = new THREE.Group();
scene.add(player);
player.add(camera); // Add the camera to the player group
camera.position.set(0, 2, 0); // Start camera above ground level

const collisionGeometry = new THREE.BoxGeometry(1,2,1); // Empty bounding box
const collisionMaterial = new THREE.MeshStandardMaterial({ color: "red", visible: false, wireframe: true });
const collisionBox = new THREE.Mesh(collisionGeometry, collisionMaterial);
player.add(collisionBox);




// PointerLockControls
const controls = new PointerLockControls(camera, document.body);


// Show menu
function startExperience() {
  // Lock the pointer
  controls.lock();
  // Hide the menu
  hideMenu();
}

const playButton = document.getElementById('play_button');
playButton.addEventListener('click', startExperience);
function showMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'block';
}
function hideMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'none';
}

controls.addEventListener('unlock', showMenu);

// Event listener to lock pointer
document.body.addEventListener('click', () => {
  controls.lock();
});

// Movement Variables
const moveSpeed = 0.16;
const velocity = new THREE.Vector3();
const keys = { forward: false, backward: false, left: false, right: false };

// Key Event Handlers
document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW': keys.forward = true; break;
    case 'KeyS': keys.backward = true; break;
    case 'KeyA': keys.left = true; break;
    case 'KeyD': keys.right = true; break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW': keys.forward = false; break;
    case 'KeyS': keys.backward = false; break;
    case 'KeyA': keys.left = false; break;
    case 'KeyD': keys.right = false; break;
  }
});


///How to play videos in Three.js
///https://www.youtube.com/watch?v=d1sr2oWnxus

// let video = document.getElementById('video');
// let videoTexture = new THREE.VideoTexture(video);
// videoTexture.minFilter = THREE.LinearFilter;
// videoTexture.magFilter = THREE.LinearFilter;
// var movieMaterial = new THREE.MeshBasicMaterial({
//   map: videoTexture,
//   side: THREE.FrontSide,
//   toneMapped: false
// });
// var movieGeometry = new THREE.PlaneGeometry(32, 18);

// // const ceilingMap = new THREE.TextureLoader().load('EXAMPLE.jpg');
// const ceilingPlane = new THREE.Mesh(movieGeometry, movieMaterial)
// ceilingPlane.position.set(0, 75, 0);
// ceilingPlane.rotation.x = Math.PI / 2;
// scene.add(ceilingPlane);


// Create the floor geometry (a box for visualization purposes)
const matLoader = new THREE.TextureLoader();
const floorTexture = matLoader.load( './img/old_wood_floor_diff_1k.jpg');
const ceilingTexture = matLoader.load( './img/wooden_garage_door_diff_1k-Dark.jpg');
const floorTextureMap = new THREE.MeshStandardMaterial({ map: 
  floorTexture,
  roughness: 1,
  metalness: 1
 });

const materials = [
  new THREE.MeshStandardMaterial({ map: floorTexture }),  // Right (+X)
  new THREE.MeshStandardMaterial({ map: floorTexture }),  // Left (-X)
  new THREE.MeshStandardMaterial({ map: 
    floorTexture,
    roughness: 1,
    metalness: 1
   }), // Top (+Y)
  new THREE.MeshStandardMaterial({ map: 
    ceilingTexture,
    roughness: 1,
    metalness: 1 }),   // Bottom (-Y)
  new THREE.MeshStandardMaterial({ map: floorTexture }),  // Front (+Z)
  new THREE.MeshStandardMaterial({ map: floorTexture })   // Back (-Z)
]
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set( 10, 10 );
ceilingTexture.wrapS = ceilingTexture.wrapT = THREE.RepeatWrapping;
ceilingTexture.repeat.set( 3, 3 );

var floorGeometry = new THREE.BoxGeometry(50, 0.1, 50); // A thin box as the floor
// var floorMaterial = new THREE.MeshStandardMaterial({ color: 'red', visible: true  });
const floorMaterial = new THREE.MeshStandardMaterial({
  map: floorTexture,
  side: THREE.DoubleSide
})

// const floorPlane1 = new THREE.Mesh(floorGeometry, floorMaterial);
// const floorPlane2 = new THREE.Mesh(floorGeometry, floorMaterial);
// const floorPlane3 = new THREE.Mesh(floorGeometry, floorMaterial);
// const floorPlane4 = new THREE.Mesh(floorGeometry, floorMaterial);
// const floorPlane5 = new THREE.Mesh(floorGeometry, floorMaterial);

const floorPlane1 = new THREE.Mesh(floorGeometry, materials);
const floorPlane2 = new THREE.Mesh(floorGeometry, materials);
const floorPlane3 = new THREE.Mesh(floorGeometry, materials);
const floorPlane4 = new THREE.Mesh(floorGeometry, materials);
const floorPlane5 = new THREE.Mesh(floorGeometry, materials);
floorPlane1.position.set(0, 0, 0);
floorPlane2.position.set(0, 15, 0);
floorPlane3.position.set(0, 30, 0);
floorPlane4.position.set(0, 45, 0);
floorPlane5.position.set(0, 60, 0);

const floorGroup = new THREE.Group();
floorGroup.add(
  floorPlane1, 
  floorPlane2, 
  floorPlane3, 
  floorPlane4, 
  floorPlane5
);


// Landings

var landingGeometry = new THREE.BoxGeometry(5, 0.1, 5);
var landingMaterial = new THREE.MeshStandardMaterial({ color: 'red', visible: true  });
var landingXpos = 27.5;;

const landingPlane1 = new THREE.Mesh(landingGeometry, landingMaterial);
const landingPlane2 = new THREE.Mesh(landingGeometry, landingMaterial);
const landingPlane3 = new THREE.Mesh(landingGeometry, landingMaterial);
const landingPlane4 = new THREE.Mesh(landingGeometry, landingMaterial);
const landingPlane5 = new THREE.Mesh(landingGeometry, landingMaterial);
const landingPlane6 = new THREE.Mesh(landingGeometry, landingMaterial);
const landingPlane7 = new THREE.Mesh(landingGeometry, landingMaterial);
const landingPlane8 = new THREE.Mesh(landingGeometry, landingMaterial);
landingPlane1.position.set(landingXpos, 0, -22.5);
landingPlane2.position.set(landingXpos, 15, 8.5);
landingPlane3.position.set(landingXpos, 15, -22.5);
landingPlane4.position.set(landingXpos, 30, 8.5);
landingPlane5.position.set(landingXpos, 30, -22.5);
landingPlane6.position.set(landingXpos, 45, 8.5);
landingPlane7.position.set(landingXpos, 45, -22.5);
landingPlane8.position.set(landingXpos, 60, 8.5);

const landingGroup = new THREE.Group();
landingGroup.add(
  landingPlane1, 
  landingPlane2, 
  landingPlane3, 
  landingPlane4, 
  landingPlane5, 
  landingPlane6, 
  landingPlane7, 
  landingPlane8
);

scene.add(
  floorGroup, 
  landingGroup
);



import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const pointyLight = new THREE.PointLight(0xffffff, 1000);
pointyLight.position.set(0, 5, 0);
scene.add(pointyLight);

const areaLight = new THREE.RectAreaLight(0xffffff, 1000);
areaLight.position.set(0, 5, 0);
areaLight.lookAt(0, 0, 0);
scene.add(areaLight);

areaLight.rotation.x = -Math.PI / 3;

// // Add a light for the staricase
// const light1 = new THREE.DirectionalLight(0xffffff, 0.01);
// light1.position.set(0, 10, 0); // Position the light
// light1.rotation.x = -Math.PI / 6;
// scene.add(light1);

// console.log("Light Parent:", light1.parent);
// console.log("Light Position:", light1.position);
// light1.castShadow = false;



// // Add a light for the staricase
// const light2 = new THREE.DirectionalLight(0xffffff, 1);
// light2.position.set(0, 10, 0); // Position the light
// light2.rotation.z = -Math.PI;
// scene.add(light2);

// const spotlightTest = new THREE.SpotLight(0xffffff, 1);
// spotlightTest.position.set(0, 10, 0); // Position the light
// spotlightTest.rotation.z = -Math.PI/2;
// scene.add(spotlightTest);



// // Add a helper for the light
// const lightHelper = new THREE.DirectionalLightHelper(light2, 5);
// scene.add(lightHelper);


// document.addEventListener('keydown', (event) => {
//   if (event.shiftKey) { // Light control only when Shift is held
//     switch (event.code) {
//       case 'ArrowUp':
//         light1.position.y += 1;
//         console.log(`Light position: ${light2.position.toArray()}`);
//         break;
//       case 'ArrowDown':
//         light2.position.y -= 1;
//         console.log(`Light position: ${light2.position.toArray()}`);
//         break;
//       case 'ArrowLeft':
//         light2.position.x -= 1;
//         console.log(`Light position: ${light2.position.toArray()}`);
//         break;
//       case 'ArrowRight':
//         light2.position.x += 1;
//         console.log(`Light position: ${light2.position.toArray()}`);
//         break;
//     }
//     updateLightHelper(); // Refresh the helper position
//   }
// });

// // Function to refresh the light helper
// function updateLightHelper() {
//   lightHelper.update(); // Updates the helper to reflect the current light direction
// }


// Create a GLTFLoader instance
const loader = new GLTFLoader();

// Load the stairs.glb file
// loader.load(
//   '/models/building_template.glb', // Replace with the correct path to your file
//   (gltf) => {
//     // Add the loaded model to the scene
//     const model = gltf.scene;
//     scene.add(model);

//     // Optionally, set the position, scale, or rotation of the model
//     // model.position.set(27.5, 0.405, -19.4); // Adjust as needed
//     model.scale.set(1, 1, 1); // Adjust as needed
//     model.rotation.y = Math.PI;

//     // Create a target for the light
//     const lightTarget = new THREE.Object3D();
//     lightTarget.position.copy(model.position); // Start pointing at the origin
//     scene.add(lightTarget);
//     light2.target = lightTarget;

//     // Loop through all children of the model
//     model.traverse((child) => {
//       if (child.isMesh) {
//         // Add the normals helper to each mesh
//         const normalsHelper = new VertexNormalsHelper(child, 1, 0xff0000); // Size 1, red color
//         scene.add(normalsHelper);
//       }
//     });
//   },
//   undefined, // Progress callback (optional)
//   (error) => {
//     console.error('An error occurred while loading the model:', error);
//   }
// );
// loadStairsModel(scene);

// Walls (Primary)
var wallGeometry = new THREE.BoxGeometry(0.1, 75, 50);
var wallGeometry2 = new THREE.BoxGeometry(0.1, 75, 55);
var wallMaterial = new THREE.MeshStandardMaterial({ color: "green", visible: true });

const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
const wall2 = new THREE.Mesh(wallGeometry2, wallMaterial);
const wall3 = new THREE.Mesh(wallGeometry2, wallMaterial);
const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
wall1.position.set(30, 37.5, 0);
wall2.position.set(2.5, 37.5, -25);
wall2.rotation.y = Math.PI / 2;
wall3.position.set(2.5, 37.5, 25);
wall3.rotation.y = Math.PI / 2;
wall4.position.set(-25, 37.5, 0);

// Walls (Secondary)
const wall5Geo = new THREE.BoxGeometry(0.1, 75, 26);
const wall5 = new THREE.Mesh(wall5Geo, wallMaterial);
wall5.position.set(25, 37.5, -7);

const wall6Geo = new THREE.BoxGeometry(0.1, 75, 5);
const wall6 = new THREE.Mesh(wall6Geo, wallMaterial);
wall6.position.set(27.5, 37.5, 11);
wall6.rotation.y = Math.PI / 2;

const wall7Geo = new THREE.BoxGeometry(0.1, 75, 14);
const wall7 = new THREE.Mesh(wall7Geo, wallMaterial);
wall7.position.set(25, 37.5, 18);

const wall8Geo = new THREE.BoxGeometry(0.1, 15, 5);
const wall8 = new THREE.Mesh(wall8Geo, wallMaterial);
wall8.position.set(25, 7.5, 8.5);

const wall9Geo = new THREE.BoxGeometry(0.1, 15, 5);
const wall9 = new THREE.Mesh(wall9Geo, wallMaterial);
wall9.position.set(25, 67.5, -22.5);

const wallGroup = new THREE.Group();
wallGroup.add(wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9);
scene.add(wallGroup);

// Wall Collisions
const wallBoundingBoxes = [];

// Generate bounding boxes for each wall in the group
wallGroup.children.forEach((wall) => {
  const bbox = new THREE.Box3().setFromObject(wall);
  wallBoundingBoxes.push(bbox);
});

console.log("wallBBox", wallBoundingBoxes);
// let previousPosition = new THREE.Vector3(); // Store last valid position

function updateMovement() {
  velocity.set(0, 0, 0); // Reset velocity each frame

  const previousPosition = player.position.clone(); // clone the camera position and store it in previousPosition. We will use this to reset the camera position if there is a collision

  if (keys.forward) velocity.z += moveSpeed;
  if (keys.backward) velocity.z -= moveSpeed;
  if (keys.left) velocity.x -= moveSpeed;
  if (keys.right) velocity.x += moveSpeed;

  // Calculate direction relative to the camera's orientation
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction); // Camera's forward direction

  direction.y = 0; // Ignore vertical movement
  direction.normalize();

  const right = new THREE.Vector3();
  right.crossVectors(direction, camera.up).normalize(); // Right vector

  // Final movement calculation
  const forwardMovement = direction.clone().multiplyScalar(velocity.z);
  const sidewaysMovement = right.clone().multiplyScalar(velocity.x);
  const totalMovement = forwardMovement.add(sidewaysMovement);

  // Apply movement to the player
  player.position.add(totalMovement);

  // Check for collisions with walls
    // After the movement is applied, we check for collisions by calling the checkCollision function. If a collision is detected, we revert the camera's position to its previous position, effectively preventing the player from moving through walls.
    if (checkCollision(player, wallGroup)) {
      player.position.copy(previousPosition); // reset the camera position to the previous position. The `previousPosition` variable is a clone of the camera position before the movement. We use `copy` instead of `set` because `set` will set the position to the same object, so if we change the previousPosition, the camera position will also change. `copy` creates a new object with the same values as the previousPosition.
    }
}
function checkCollision(player, wallGroup) {
  const playerBBox = new THREE.Box3().setFromObject(player);
  
  for (let i = 0; i < wallGroup.children.length; i++) {
    const wallBBox = new THREE.Box3().setFromObject(wallGroup.children[i]);
    
    if (playerBBox.intersectsBox(wallBBox)) {
      return true;
    }
  }
  return false;
}


// Create the ramps
var rampGeometry = new THREE.BoxGeometry(5, 0.1, 30);
var rampMaterial = new THREE.MeshStandardMaterial({ color: 'blue', visible: true  });

const ramp1 = new THREE.Mesh(rampGeometry, rampMaterial);
const ramp2 = new THREE.Mesh(rampGeometry, rampMaterial);
const ramp3 = new THREE.Mesh(rampGeometry, rampMaterial);
const ramp4 = new THREE.Mesh(rampGeometry, rampMaterial);
ramp1.position.set(27.5, 7.5, -7);
ramp2.position.set(27.5, 22.5, -7);
ramp3.position.set(27.5, 37.5, -7);
ramp4.position.set(27.5, 52.5, -7);
ramp1.rotation.x = -Math.PI / 6; // Adjust angle as needed
ramp2.rotation.x = -Math.PI / 6; // Adjust angle as needed
ramp3.rotation.x = -Math.PI / 6; // Adjust angle as needed
ramp4.rotation.x = -Math.PI / 6; // Adjust angle as needed
scene.add(ramp1, ramp2, ramp3, ramp4);

const rampGroup = new THREE.Group();
rampGroup.add(ramp1, ramp2, ramp3, ramp4);
scene.add(rampGroup);


//---------------RAYCASTER/COLLISIONS-----------------

// Raycaster for ramp and floor detection
const raycaster = new THREE.Raycaster();
const downwardDirection = new THREE.Vector3(0, -1, 0);// Downward ray direction
const rampObjects = [rampGroup]; // Objects to test for ramps
const objectsToDetect = [rampGroup, floorGroup, landingGroup]; // All objects to detect
const playerHeight = 2; // Assume the player's height is 2 units

// Initialize player's position to a valid starting point above the first floor
player.position.set(0, 1, 0); // Make sure the player is positioned above the floor initially

// Handle ramp and floor detection
function handleRampAndFloorDetection() {
  raycaster.set(player.position, downwardDirection);

  // Detect intersections with the ramp and floors
  const intersects = raycaster.intersectObjects(objectsToDetect);

  if (intersects.length > 0) {
    // Sort by distance to prioritize the closest surface
    intersects.sort((a, b) => a.distance - b.distance);
    const closest = intersects[0];

    // Adjust player's y position based on the detected surface
    const surfaceHeight = closest.point.y;
    const targetHeight = surfaceHeight + playerHeight / 2;

    // Smoothly move player to the surface height
    player.position.y = THREE.MathUtils.lerp(player.position.y, targetHeight, 0.1);
  } else {
    // Apply gravity if no surface is detected
    player.position.y += -0.1; // Simulate gravity by moving down slowly
  }
}




// Animation Loop
function animate() {
  requestAnimationFrame(animate);

 // Update raycaster for player and handle surface detection
  handleRampAndFloorDetection();

  // Update movement when controls are locked
  if (controls.isLocked) {
    updateMovement();
  }

  // Render the scene
  renderer.render(scene, camera);
}

animate();

