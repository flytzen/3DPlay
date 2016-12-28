var scene = new THREE.Scene();
var width = 700;
var height = 500;

var VIEW_ANGLE = 45, ASPECT = width / height, NEAR = 0.1, FAR = 20000;
camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
// This really ought to use an OrtographicCamera - but there seems to be a bug with that... 
//camera = THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 )
scene.add(camera);
camera.position.set(0,50,100);
camera.lookAt(scene.position);

// Renderer
var renderer = new THREE.WebGLRenderer();
//renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

// OBJECT MANIPULATOR
var keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
var mouseButtons = { LEFT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, RIGHT: THREE.MOUSE.RIGHT };

function onKeyDown(event) {
	
	switch ( event.keyCode ) {
		case keys.UP:
			mesh.position.y++;
			break;
		case keys.BOTTOM:
			mesh.position.y--;
			break;
		case keys.LEFT:
			mesh.position.x--;
			break;
		case keys.RIGHT:
			mesh.position.x++;
			break;
	}
}

var mouseStartX, mouseStartY;
function onMouseDown(event) {
	event.preventDefault();
	//event.clientX, event.clientY
	if (event.button === mouseButtons.LEFT) {
		mouseStartX = event.clientX;
		mouseStartY = event.clientY;
		document.addEventListener( 'mousemove', onMouseMove, false );
		document.addEventListener( 'mouseup', onMouseUp, false );
	}
}

function onMouseMove(event) {
	handleMouseMove(event);
}

function onMouseUp(event) {
	document.removeEventListener( 'mousemove', onMouseMove, false );
	document.removeEventListener( 'mouseup', onMouseUp, false );
	handleMouseMove(event);
}

function handleMouseMove(event) {
	
	const deltaX = event.clientX - mouseStartX;
	const deltaY = event.clientY - mouseStartY;
	mesh.rotation.z += deltaX/ 100;
	mesh.rotation.y += deltaY / 100;

	// Something in the lines below should sort out the rotation issues... 
	//mesh.updateMatrix();

	//mesh.geometry.applyMatrix( mesh.matrix );

	//mesh.position.set( 0, 0, 0 );
	//mesh.rotation.set( 0, 0, 0 );
	//mesh.scale.set( 1, 1, 1 );
	//mesh.updateMatrix();

	mouseStartX = event.clientX;
	mouseStartY = event.clientY;

}

// LOADER
var loader = new THREE.STLLoader();
var mash;
loader.load( 'resources/brain-gear.stl', function ( geometry ) {

	var meshMaterial = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, meshMaterial );

	mesh.position.set( 0, 20, 0 );
	//mesh.rotation.set( - Math.PI / 2, Math.PI / 2, 0 );
	mesh.rotation.set( Math.PI / 2 - 0.5, 0, 0 );
	mesh.scale.set( 10, 10, 10 );

	scene.add( mesh );

	// renderer.domElement.addEventListener( 'contextmenu', onContextMenu, false );

	renderer.domElement.addEventListener( 'mousedown', onMouseDown, false );
	// renderer.domElement.addEventListener( 'wheel', onMouseWheel, false );

	// renderer.domElement.addEventListener( 'touchstart', onTouchStart, false );
	// renderer.domElement.addEventListener( 'touchend', onTouchEnd, false );
	// renderer.domElement.addEventListener( 'touchmove', onTouchMove, false );

	window.addEventListener( 'keydown', onKeyDown, false );

} );








// STATS
stats = new Stats();
stats.showPanel(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
stats.domElement.style.zIndex = 100;
document.body.appendChild( stats.domElement );

function render() {
    stats.update();
    //cube.rotation.y += 0.01;
	renderer.render( scene, camera );
    
    requestAnimationFrame( render );
}
render();