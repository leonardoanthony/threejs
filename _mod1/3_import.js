import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

if ( WebGL.isWebGL2Available() ) {

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let shiba;
const loader = new GLTFLoader();

loader.load( './assets/shiba.glb', function ( gltf ) {

    shiba = gltf.scene;
    shiba.rotation.y += .5;
    shiba.scale.set(20,20,20); // Dobrar o tamanho
	scene.add( shiba );
}, undefined, function ( error ) {

	console.error( error );

} );

function animate() {
    if (shiba) { // Verifica se shiba já foi carregado
        shiba.rotation.y -= 0.01;
    }
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);




} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}