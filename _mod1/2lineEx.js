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
 
let currentPosition = new THREE.Vector3(0, 0, 0); // Posição inicial

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, material);

scene.add(line);

function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': line.rotation.x += 1; break;
        case 'ArrowLeft': line.rotation.y += 1; break;
        case 'ArrowRight': line.rotation.y -= 1; break;
        case '4': line.rotation.z += 1; break;
        case '6': line.rotation.z -= 1; break;
        case 'ArrowDown': line.rotation.x -= 1; break;
        case 'w': moveAndAddPoint(0, 10, 0); break;
        case 's': moveAndAddPoint(0, -10, 0); break;
        case 'a': moveAndAddPoint(-10, 0, 0); break;
        case 'd': moveAndAddPoint(10, 0, 0); break;
        case 'e': moveAndAddPoint(0, 0, -10); break;
        case 'q': moveAndAddPoint(0, 0, 10); break;
        default: break;
    }
    console.log(e.key);
});

// Função para mover e adicionar o ponto
function moveAndAddPoint(x, y, z) {
    // Atualiza a posição atual com a movimentação
    currentPosition.x += x;
    currentPosition.y += y;
    currentPosition.z += z;

    // Adiciona o novo ponto na posição atual
    points.push(currentPosition.clone());

    // Atualiza a geometria com os novos pontos
    const newPositions = new Float32Array(points.flatMap(p => [p.x, p.y, p.z]));
    line.geometry.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));
    line.geometry.attributes.position.needsUpdate = true;
}



} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}