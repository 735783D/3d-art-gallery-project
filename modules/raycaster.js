// import * as THREE from 'three';

// export function createRaycaster(object) {
//       // Raycaster for ramps
//       const raycaster = new THREE.Raycaster();
//       const downwardDirection = new THREE.Vector3(0, -1, 0); // Downward ray direction
//       // const rampObjects = [ramp]; // Objects to test for ramps

//       return { raycaster, downwardDirection }
// }

//------------------------------------
import * as THREE from 'three';

/**
 * Creates a raycaster and a downward direction vector for detecting collisions.
 *
 * @param {THREE.Object3D[]} objects - An array of objects to test collisions against.
 * @returns {{raycaster: THREE.Raycaster, downwardDirection: THREE.Vector3}} An object containing the raycaster and downward direction.
 */
export function createRaycaster(objects) {
    if (!Array.isArray(objects)) {
        throw new TypeError("Expected objects to be an array of THREE.Object3D.");
    }

    // Raycaster for ramps
    const raycaster = new THREE.Raycaster();
    const downwardDirection = new THREE.Vector3(0, -1, 0); // Downward ray direction

    return { raycaster, downwardDirection };
}
