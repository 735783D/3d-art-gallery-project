import * as THREE from "three";             // import the THREE library
import { PointerLockControls } from "three-stdlib";
import { createWalls } from "./modules/walls";
import { setupFloor } from "./modules/floor";
import { createCeiling } from "./modules/ceiling";
import { createPaintings } from "./modules/paintings";
import { addObjectsToScene } from "./modules/sceneHelpers";
import { setupRendering } from "./modules/rendering";
import { setupLighting } from "./modules/lighting";
import { cubeTest } from "./modules/cubeTest";
import { paintingTest } from "./modules/paintingTest"; 
import { scene, setupScene } from "./modules/scene";
import { setupEventListeners } from "./modules/eventListeners";
import { setupPlayButton } from "./modules/menu";
import { setupAudio } from "./modules/audioGuide";

let { camera, controls, renderer } = setupScene();
setupAudio(camera);

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//     75, 
//     window.innerWidth / window.innerHeight, 
//     0.1, // near clipping plane
//     1000  // far clipping plane
// );
// scene.add(camera);
// camera.position.z = 5; // move camera away from the canvas by 5 units

// camera.position.y = 20;          // move camera up by 5 units
// camera.rotateOnAxis(new THREE.Vector3(-.75, 0, 0), Math.PI / 2);  // rotate camera 90 degrees around y axis

// const renderer = new THREE.WebGLRenderer({antialias: false}); // for smooth edges
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xffffff, 1); // background color
// document.body.appendChild(renderer.domElement); // add the renderer to the DOM

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
document.addEventListener('keydown', onKeyDown, false);
// setupEventListeners(controls);



const textureLoader = new THREE.TextureLoader();
const walls = createWalls(scene, textureLoader);
const floor = setupFloor(scene);
const ceiling = createCeiling(scene, textureLoader);
const paintings = createPaintings(scene, textureLoader);
const lighting = setupLighting(scene, paintings);
addObjectsToScene(scene, paintings);
setupRendering(scene, camera, renderer, paintings, controls, walls);
const cubeTests = cubeTest(scene);
const paintingTests = paintingTest(scene);
setupPlayButton(controls);






// function createPainting(imageURL, width, height, position) {
//     const textureLoader = new THREE.TextureLoader();
//     const paintingTexture = textureLoader.load(imageURL);
//     const ptintingMaterial = new THREE.MeshBasicMaterial({
//         map: paintingTexture,
//     });
//     const paintingGeometry = new THREE.PlaneGeometry(width, height);
//     const painting = new THREE.Mesh(paintingGeometry, ptintingMaterial);
//     painting.position.set(position.x, position.y, position.z);
//     return painting;
// }

// const painting1 = createPainting(
//     './artworks/finalGetsugaGrey.jpg', 
//     10, 
//     5, 
//     new THREE.Vector3(10, 5, -24.9)
// );
// const painting2 = createPainting(
//     './artworks/viduus.png', 
//     10, 
//     5, 
//     new THREE.Vector3(-10, 5, -20)
// );
// scene.add(painting1, painting2);

// Controls
// const controls = new PointerLockControls(camera, document.body);

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
function onKeyDown(event) {
    switch(event.keyCode) {
        case 37: // left arrow
            camera.translateX(-0.5);
            break;
        case 38: // up arrow
            camera.translateZ(-0.5);
            break;
        case 39: // right arrow
            camera.translateX(0.5);
            break;
        case 40: // down arrow
            camera.translateZ(0.5);
            break;
    }
}

// Animation
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cubeTests.rotation.x += 0.01;
    cubeTests.rotation.y += 0.01;
    paintingTests.rotation.x += 0.01;
    paintingTests.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();