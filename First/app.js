var scene = new THREE.Scene();
var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;	

// CAMERA
	// camera attributes
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	// set up camera
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	// add the camera to the scene
	scene.add(camera);
	// the camera defaults to position (0,0,0)
	// 	so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);

// Renderere
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// CUBE
var geometry = new THREE.BoxGeometry( 40, 40, 40 );
var material = new THREE.MeshLambertMaterial( { 
	color: 0xff88ff, 
	//emissive : 0x0000ff 
} );
var cube = new THREE.Mesh( geometry, material );
cube.position.set(-100,50,0);
cube.castShadow = true;
scene.add( cube );

// SPHERE
// Sphere parameters: radius, segments along width, segments along height
var sphereGeometry = new THREE.SphereGeometry( 50, 32, 16 ); 
// use a "lambert" material rather than "basic" for realistic lighting.
//   (don't forget to add (at least one) light!)
var sphereMaterial = new THREE.MeshPhongMaterial( {color: 0x8888ff} ); 
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(100, 70, -50);
sphere.castShadow = true;
scene.add(sphere);

// LIGHT
//var light = new THREE.PointLight(0xffffff, 2, 1000);
let light = new THREE.SpotLight(0xffffff, 3, 1000);
light.position.set(0,500,0);
light.castShadow = true;
//light.shadowMapHeight = 1024;
//light.shadowMapWidth = 1024;
scene.add(light);
var ambientLight = new THREE.AmbientLight(0x111111);
//scene.add(ambientLight);


// FLOOR
var floorMaterial = new THREE.MeshPhongMaterial({
	color: 0x999999,
	side: THREE.DoubleSide
});
var floorGeometry = new THREE.PlaneGeometry(1000,1000,1,1);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
floor.receiveShadow = true;
//floor.position.y = -0.5;
scene.add(floor);

//CONTROLS
controls = new THREE.OrbitControls(camera);

// Tweaker
// var gui = new dat.GUI();
// var params = {
//   cameraZ : 5,
//   cameraX : 0,
//   cameraY : 0
// }

// gui
//    .add(params, "cameraZ")
//    .min(1)
//    .max(100)
//    .onChange(v => {
//        camera.position.z = v;
//        camera.lookAt(scene.position);
//     });
// gui
//   .add(params, "cameraX")
//   .min(-100)
//   .max(100)
//   .onChange(v => {
//       camera.position.x = v;
//       camera.lookAt(scene.position);
//     });
// gui
//   .add(params, "cameraY")
//   .min(-100)
//   .max(100)
//   .onChange(v => {
//       camera.position.y = v;
//       camera.lookAt(scene.position);
//     });

stats = new Stats();
stats.showPanel(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
stats.domElement.style.zIndex = 100;
document.body.appendChild( stats.domElement );

function render() {
    stats.update();
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
    
    requestAnimationFrame( render );
}
render();