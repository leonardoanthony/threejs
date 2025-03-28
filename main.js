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
camera.position.z = 50;

const scene = new THREE.Scene();

const geometry = new THREE.TorusGeometry( 12, 1, 10, 6 ); 

const material = new THREE.MeshBasicMaterial( { color: 0xaf61fa } ); 
const torus = new THREE.Mesh( geometry, material ); 
scene.add( torus );

const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})

const wireMesh = new THREE.Mesh(geometry, wireMaterial);

wireMesh.scale.setScalar(1.001);

torus.add(wireMesh);

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene, camera);
}

animate();