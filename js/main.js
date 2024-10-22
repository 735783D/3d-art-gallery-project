import * as THREE from "three";             // import the THREE library

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, // near clipping plane
    1000  // far clipping plane
);
scene.add(camera);
camera.position.z = 5; // move camera away from the canvas by 5 units

const renderer = new THREE.WebGLRenderer({antialias: false}); // for smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1); // background color
document.body.appendChild(renderer.domElement); // add the renderer to the DOM

// Lights
// ambient light
let ambientLight = new THREE.AmbientLight(0x101010, 1.0); //color and intensity,distance
// ambientLight.position = camera.position; // light follows camera
scene.add(ambientLight);

// directional light
let sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); //color and intensity
sunLight.position.y = 15;
scene.add(sunLight);

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({color: 'blue'});
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);    // add the cube to the scene

// Controls
// Event listeners for the keys
document.addEventListener('keydown', onKeyDown, false);

// Functions for keys
function onKeyDown(event) {
    switch(event.keyCode) {
        case 37: // left arrow
            camera.translateX(0.05);
            break;
        case 38: // up arrow
            camera.translateY(-0.05);
            break;
        case 39: // right arrow
            camera.translateX(-0.05);
            break;
        case 40: // down arrow
            camera.translateY(0.05);
            break;
    }
}

// Animation
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();