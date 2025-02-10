
// create renderElement, renderObject, renderer, scene, camera, controls and material
const renderElement = document.getElementById("renderElement");  // html elements
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera( renderElement.offsetWidth / -2, renderElement.offsetWidth / 2, renderElement.offsetHeight / 2, renderElement.offsetHeight / -2, 1, 1000 );
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const material = new THREE.MeshBasicMaterial( { color: 0xd8d8d8, transparent: true, opacity: 0.3 } ); // material is the texture with which the renderer renders a geometryObject
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xd8d8d8, linewidth: 5});

// set up renderer
renderer.setSize( renderElement.offsetWidth, renderElement.offsetHeight ); // set size of renderer to size of renderElement
renderer.setClearColor(0x2e3236); // set background color
renderElement.appendChild(renderer.domElement); // insert renderer in renderElement
window.addEventListener('resize', () => {
    renderer.setSize(renderElement.offsetWidth, renderElement.offsetHeight); // eventListener for resize of renderElement
});
function animate() {
    updateCameraDistance(geometryObject, 500);
    updateCameraZoom(geometryObject, 250);
    controls.update();
    renderer.render( scene, camera );
}
renderer.setAnimationLoop(animate); // set render loop for renderer 

// set up camera
camera.position.set(-3, -2, 10);
camera.lookAt(0, 0, 0);
function updateCameraDistance(targetObject, Distance) { // calcs the distance to geometryObject and sets the distance to the camera according to Distance
    const boundingBox = new THREE.Box3().setFromObject(targetObject);
    const size = boundingBox.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);
    const newDistance = Distance + maxDimension * 0.5;
    const direction = camera.position.clone().sub(targetObject.position).normalize();
    camera.position.copy(targetObject.position).add(direction.multiplyScalar(newDistance));
    camera.lookAt(targetObject.position);
}
function updateCameraZoom(targetObject, zoom) {
    const boundingBox = new THREE.Box3().setFromObject(targetObject);
    const size = boundingBox.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);
    camera.zoom = zoom / maxDimension;
    camera.updateProjectionMatrix();
}

// set up controls for orbitControls. which enables moving
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.minDistance = 1;
controls.maxDistance = 500;

// add scene a geometry object
switch(document.body.getAttribute("data-site")){
    case "quader":
        const geometry = new THREE.BoxGeometry( quader.a.value, quader.b.value, quader.c.value );
        var geometryObject = new THREE.Mesh( geometry, material );
        const edgeLines = new THREE.EdgesGeometry(geometryObject.geometry);
        var edgeLinesObject = new THREE.LineSegments(edgeLines, lineMaterial);
        break;

    case "kugel":
        break;

    case "zylinder":
        break;

    case "prisma":
        break;

    case "pyramide":
        break;
    default:
        break;
}

scene.add( geometryObject, edgeLinesObject );

// update geometryObject and edgeLinesObject
function upQuader() {
    scene.remove(geometryObject, edgeLinesObject);
    geometryObject.geometry.dispose();
    const geometry = new THREE.BoxGeometry( quader.a.value, quader.c.value, quader.b.value );
    geometryObject = new THREE.Mesh( geometry, material );
    edgeLinesObject.geometry.dispose();
    const edgeLines = new THREE.EdgesGeometry(geometryObject.geometry);
    edgeLinesObject= new THREE.LineSegments(edgeLines, lineMaterial);
    console.log("moin");
    scene.add(geometryObject, edgeLinesObject);
}
upQuader();
setInterval(upQuader, 1000)


