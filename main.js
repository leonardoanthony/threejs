import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

const geometry = new THREE.IcosahedronGeometry(1, 3)
const material = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    flatShading: true, 

}); 
const mesh = new THREE.Mesh( geometry, material ); 
scene.add( mesh );

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})

const wireMash = new THREE.Mesh(geometry, wireMat);
// wireMash.scale.setScalar(1.001);
mesh.add(wireMash);

const hemiLight = new THREE.HemisphereLight(0x9999ff, 0xaa5500);
scene.add(hemiLight);

let speedX = 0;
let speedY = 0;

function animate(){
    requestAnimationFrame(animate);
    mesh.rotation.y += speedX / 1000
    mesh.rotation.x += speedY / 1000
    renderer.render(scene, camera);
    controls.update();
}

document.getElementById('speedX').addEventListener('change', (e) => {
    const value = e.target.value;
    const textValue = document.getElementById('valueX');
    textValue.innerText = value;
    speedX = Number(value)*5;
})
document.getElementById('speedY').addEventListener('change', (e) => {
    const value = e.target.value;
    const textValue = document.getElementById('valueY');
    textValue.innerText = value;
    speedY = Number(value)*5;
})

animate();

// ver mais 

// diferentes objetos primitivos
// diferentes luzes ( direcional , solar, point and spotlight )
// animação, posição, rotação, tamanho, cor do objeto e cor da luz
