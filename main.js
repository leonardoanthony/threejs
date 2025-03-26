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

// const object = new THREE.Object3D();
// object.updateMatrix();
// object.matrixAutoUpdate = false;
// scene.add( object );

const maxPoints = 500; // Capacidade máxima de vértices
const positions = new Float32Array(maxPoints * 3); // Cada ponto tem (x, y, z)

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setDrawRange(0, 2); // Inicialmente, desenha apenas dois pontos

const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const line = new THREE.Line(geometry, material);
scene.add(line);

let count = 2; // Começa com 2 pontos

function addPoint(x, y, z) {
    if (count >= maxPoints) return; // Se atingiu o limite, não adiciona mais
    
    positions[count * 3] = x;
    positions[count * 3 + 1] = y;
    positions[count * 3 + 2] = z;
    
    geometry.attributes.position.needsUpdate = true; // Indica que os dados mudaram
    geometry.setDrawRange(0, count + 1); // Atualiza a quantidade de pontos visíveis
    
    count++;
}


function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


setInterval(() => {
    addPoint(Math.random() * 30, Math.random() * 30, Math.random() * 30);
}, 100);

} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}