const painting1 = createPainting(
    './artworks/finalGetsugaGrey.jpg', 
    10, 
    5, 
    new THREE.Vector3(10, 5, -24.9)
);
const painting2 = createPainting(
    './artworks/viduus.png', 
    10, 
    5, 
    new THREE.Vector3(-10, 5, -20)
);
scene.add(painting1, painting2);