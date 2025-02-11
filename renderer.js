
// create renderElement, renderObject, renderer, scene, camera, controls and material
const renderElement = document.getElementById("renderElement");  // html elements
const renderer = new THREE.WebGLRenderer();
const cssRenderer = new THREE.CSS2DRenderer();
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera( renderElement.offsetWidth / -2, renderElement.offsetWidth / 2, renderElement.offsetHeight / 2, renderElement.offsetHeight / -2, 1, 1000 );
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const material = new THREE.MeshBasicMaterial( { color: 0xd8d8d8, transparent: true, opacity: 0.15} ); // material is the texture with which the renderer renders a geometryObject
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xd8d8d8, linewidth: 5});
const lineMaterialBlue = new THREE.LineBasicMaterial({ color: 0x8fb6ff, linewidth: 5});

// set up renderer
renderer.setSize( renderElement.offsetWidth, renderElement.offsetHeight ); // set size of renderer to size of renderElement
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0x2e3236); // set background color
cssRenderer.setSize( renderElement.offsetWidth, renderElement.offsetHeight );
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0px';
cssRenderer.domElement.style.pointerEvents = 'none';
renderElement.appendChild(renderer.domElement); // insert renderer in renderElement
renderElement.appendChild(cssRenderer.domElement);
window.addEventListener('resize', () => { // eventListener for resize of renderElement
    renderer.setSize(renderElement.offsetWidth, renderElement.offsetHeight);
    cssRenderer.setSize(renderElement.offsetWidth, renderElement.offsetHeight);
    camera.left = renderElement.offsetWidth / -2;
    camera.right = renderElement.offsetWidth / 2;
    camera.top = renderElement.offsetHeight / 2;
    camera.bottom = renderElement.offsetHeight / -2;
    camera.updateProjectionMatrix();
});
function animate() {
    updateCameraDistance(geometryObject, 500);
    updateCameraZoom(geometryObject, 250);
    if(document.body.getAttribute("data-site") == "kugel"){
        ringObject.quaternion.copy(camera.quaternion);
    }
    controls.update();
    renderer.render( scene, camera );
    cssRenderer.render(scene, camera);
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
let geometry;
let geometryObject;
let edgeLines;
let edgeLinesObject;
switch(document.body.getAttribute("data-site")){
    case "quader":
        geometry = new THREE.BoxGeometry( quader.a.value, quader.c.value, quader.b.value );
        geometryObject = new THREE.Mesh( geometry, material );
        edgeLines = new THREE.EdgesGeometry(geometryObject.geometry);
        edgeLinesObject = new THREE.LineSegments(edgeLines, lineMaterial);
        const infoQuaderA = document.getElementById('infoQuaderA');
        const infoQuaderB = document.getElementById('infoQuaderB');
        const infoQuaderC = document.getElementById('infoQuaderC');
        var infoA_Object = new THREE.CSS2DObject(infoQuaderA);
        var infoB_Object = new THREE.CSS2DObject(infoQuaderB);
        var infoC_Object = new THREE.CSS2DObject(infoQuaderC);
        infoA_Object.position.set(0, quader.c.value /2 * -1, quader.b.value / 2 * -1 );
        infoB_Object.position.set(quader.a.value / 2 , quader.c.value /2 * -1, 0);
        infoC_Object.position.set(quader.a.value / 2 , 0, quader.b.value / 2 );
        geometryObject.add(infoA_Object, infoB_Object, infoC_Object);
        scene.add( geometryObject, edgeLinesObject );
        break;

    case "kugel":
        geometry = new THREE.SphereGeometry( kugel.r.value, 32, 32 );
        geometryObject = new THREE.Mesh( geometry, material );
        const ring = new THREE.RingGeometry(kugel.r.value - 0.04, kugel.r.value, 32);
        var ringObject = new THREE.Mesh( ring, lineMaterial );
        const lineD = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(kugel.r.value, 0, 0), new THREE.Vector3(kugel.r.value * -1, 0, 0)]);
        var lineD_Object = new THREE.Line(lineD, lineMaterial);
        const lineR = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0,kugel.r.value * -1)]);
        var lineR_Object = new THREE.Line(lineR, lineMaterial);
        const infoQuaderR = document.getElementById('infoQuaderR');
        const infoQuaderD = document.getElementById('infoQuaderD');
        const infoQuaderX = document.getElementById('infoQuaderX');
        var infoR_Object = new THREE.CSS2DObject(infoQuaderR);
        var infoD_Object = new THREE.CSS2DObject(infoQuaderD);
        var infoX_Object = new THREE.CSS2DObject(infoQuaderX);
        infoR_Object.position.set(0, 0, kugel.r.value * -1 / 2);
        infoD_Object.position.set(kugel.r.value / 2,0,0);
        infoX_Object.position.set(0, 0, 0);
        geometryObject.add(lineD_Object, lineR_Object, infoX_Object, infoD_Object, infoR_Object);
        scene.add( geometryObject, ringObject);
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

// update geometryObject and edgeLinesObject
function upQuader() {
    scene.remove(geometryObject, edgeLinesObject);
    geometryObject.geometry.dispose();
    const geometry = new THREE.BoxGeometry( quader.a.value, quader.c.value, quader.b.value );
    geometryObject = new THREE.Mesh( geometry, material );
    edgeLinesObject.geometry.dispose();
    const edgeLines = new THREE.EdgesGeometry(geometryObject.geometry);
    edgeLinesObject= new THREE.LineSegments(edgeLines, lineMaterial);
    infoA_Object.position.set(0, quader.c.value /2 * -1, quader.b.value / 2 * -1 );
    infoB_Object.position.set(quader.a.value / 2 , quader.c.value /2 * -1, 0);
    infoC_Object.position.set(quader.a.value / 2 , 0, quader.b.value / 2 );
    geometryObject.add(infoA_Object, infoB_Object, infoC_Object);
    scene.add(geometryObject, edgeLinesObject);
}
function upKugel() {
    scene.remove(geometryObject, ringObject);
    geometryObject.geometry.dispose();
    ringObject.geometry.dispose();
    geometry = new THREE.SphereGeometry( kugel.r.value, 32, 32 );
    geometryObject = new THREE.Mesh( geometry, material );
    const ring = new THREE.RingGeometry(kugel.r.value - 0.04, kugel.r.value, 32);
    ringObject = new THREE.Mesh( ring, lineMaterial );
    const lineD = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(kugel.r.value, 0, 0), new THREE.Vector3(kugel.r.value * -1, 0, 0)]);
    lineD_Object = new THREE.Line(lineD, lineMaterial);
    const lineR = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0,kugel.r.value * -1)]);
    lineR_Object = new THREE.Line(lineR, lineMaterial);
    infoR_Object.position.set(0, 0, kugel.r.value * -1 / 2);
    infoD_Object.position.set(kugel.r.value / 2,0,0);
    infoX_Object.position.set(0, 0, 0);
    geometryObject.add(lineD_Object, lineR_Object, infoX_Object, infoD_Object, infoR_Object);
    scene.add( geometryObject, ringObject);
}

