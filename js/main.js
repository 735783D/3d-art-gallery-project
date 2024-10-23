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
const material = new THREE.MeshBasicMaterial({color: 'blue'});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);    // add the cube to the scene

// Controls
// Event listeners for the keys
document.addEventListener('keydown', onKeyDown, false);

// Texture
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load( './img/floor.png' );
colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
colorTexture.repeat.set( 10, 10 );


// Create the plane
const planeGeometry = new THREE.PlaneGeometry(45, 45); 
const planeMaterial = new THREE.MeshStandardMaterial({
    map: colorTexture,
    // color: 'black',
    side: THREE.DoubleSide,
});
const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
floorPlane.rotation.x = Math.PI / 2;  // rotate the plane by 90 degrees around the y axis (x in Blender)  
floorPlane.position.y = -Math.PI;   // rotate the plane by 90 degrees around the x axis (z in Blender)
scene.add(floorPlane);

// Create the walls
const wallGroup = new THREE.Group();
scene.add(wallGroup);

// Front wall
const frontLeftWall = new THREE.Mesh(
    new THREE.BoxGeometry(10, 20, 10),
    new THREE.MeshBasicMaterial({color: 'green'})
);

frontLeftWall.position.x = -10;
frontLeftWall.position.z = -10;

const frontRightWall = new THREE.Mesh(
    new THREE.BoxGeometry(10, 20, 10),
    new THREE.MeshBasicMaterial({color: 'green'})
);

frontRightWall.position.x = 10;
frontRightWall.position.z = -10;

wallGroup.add(frontLeftWall, frontRightWall);

// Functions for keys
function onKeyDown(event) {
    switch(event.keyCode) {
        case 37: // left arrow
            camera.translateX(-0.05);
            break;
        case 38: // up arrow
            camera.translateZ(-0.05);
            break;
        case 39: // right arrow
            camera.translateX(0.05);
            break;
        case 40: // down arrow
            camera.translateZ(0.05);
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