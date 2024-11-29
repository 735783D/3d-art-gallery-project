import * as THREE from 'three';
// import { createBackWall,backWall } from './backWall.js';

// check if objects is an array. If it's not, we assume it's a THREE.Group and set objects to objects.children. We then use forEach to loop over each object in objects and add a bounding box to it
export const createBoundingBoxes = (objects) => {
  // objects will be either paintings or walls that we pass in from main.js
  if (!Array.isArray(objects)) {
    objects = objects.children;
  }

  objects.forEach((object) => {
    object.BoundingBox = new THREE.Box3(); // create a new bounding box for each object
    object.BoundingBox.setFromObject(object); // set the bounding box to the object (painting or wall)
  });
};

// export const createBackWallBoundingBox = (scene) => {
//     let backWallBBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
//     backWallBBox.setFromObject(backWall);
//     console.log(backWallBBox);

//     return backWallBBox;
// }