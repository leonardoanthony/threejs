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

const object = new THREE.Object3D();
// mover
object.position.set(5,2,3);
//girar
object.quaternion.set(0,1,0,1);
//crescer/diminuir
object.scale.set(2,2,2);

object.matrixAutoUpdate = false;
object.updateMatrix(); // Atualizamos manualmente só quando quisermos

object.updateMatrixWorld(); // Atualiza os objetos dentro do objeto




function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}