import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

if ( WebGL.isWebGL2Available() ) {

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const points = [];
points.push( new THREE.Vector3( 0, 0, 0 ));
points.push( new THREE.Vector3( 10, 0, 0 ));
points.push( new THREE.Vector3( 10, -20, 0 ));
points.push( new THREE.Vector3( 20, -20, 0 ));
points.push( new THREE.Vector3( 20, -30, 0 ));
points.push( new THREE.Vector3( 0, -30, 0 ));
points.push( new THREE.Vector3( 0, 0, 0 ));
points.push( new THREE.Vector3( 0, 0, -10 ));
points.push( new THREE.Vector3( 10, 0, -10 ));
points.push( new THREE.Vector3( 10, 0, 0 ));
points.push( new THREE.Vector3( 10, 0, -10 ));
points.push( new THREE.Vector3( 10, -20, -10 ));
points.push( new THREE.Vector3( 10, -20, 0 ));
points.push( new THREE.Vector3( 10, -20, -10 ));
points.push( new THREE.Vector3( 20, -20, -10 ));
points.push( new THREE.Vector3( 20, -20, 0 ));
points.push( new THREE.Vector3( 20, -20, -10 ));
points.push( new THREE.Vector3( 20, -30, -10 ));
points.push( new THREE.Vector3( 20, -30, 0 ));
points.push( new THREE.Vector3( 20, -30, -10 ));
points.push( new THREE.Vector3( 0, -30, -10 ));
points.push( new THREE.Vector3( 0, -30, 0 ));
points.push( new THREE.Vector3( 0, -30, -10 ));
points.push( new THREE.Vector3( 0, 0, -10 ));

const geometry = new THREE.BufferGeometry().setFromPoints( points )

const line = new THREE.Line( geometry, material );


scene.add( line );
function animate() {
    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': line.rotation.x += 1;break;
        case 'ArrowLeft':line.rotation.y += 1;break;
        case 'ArrowRight':line.rotation.y -= 1;break;
        case 'ArrowDown':line.rotation.x -= 1;break;
        case 's': line.position.z += 2;break;
        case 'd':line.position.x += 2;break;
        case 'a':line.position.x -= 2;break;
        case 'w':line.position.z -= 2;break;
        case 'q':line.position.y += 2;break;
        case 'e':line.position.y -= 2;break;
        default:break;
    }
    console.log(e.key)
})



} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}