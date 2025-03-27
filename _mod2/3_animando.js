import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

if ( WebGL.isWebGL2Available() ) {

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// caso houvesse um objeto ja importado
/**
 * let mesh; // Seu modelo 3D com animações

// Criando o mixer de animações
const mixer = new THREE.AnimationMixer(mesh);

// Pegando todas as animações do modelo
const clips = mesh.animations;

// Atualizando o mixer a cada quadro (frame)
function update() {
  mixer.update(deltaSeconds); // deltaSeconds é o tempo entre os quadros
}

// Reproduzindo uma animação específica
const danceClip = THREE.AnimationClip.findByName(clips, 'dance');
const action = mixer.clipAction(danceClip);
action.play();

// Reproduzindo todas as animações
clips.forEach(function (clip) {
  mixer.clipAction(clip).play();
});
 * 
 * 
 */

// Adicionar o cubo à cena
scene.add(cube);
camera.position.z = 4;


// 5. Criar um mixer de animação para controlar as animações
const mixer = new THREE.AnimationMixer(cube);

const tempos = [0, 2, 4, 6];
const posicoes = [
    0, 2, 0,    // tempo 0: posição inicial
    0, -2, 0,   // tempo 2: desce
    0, 0, 0,    // tempo 4: sobe
    0, 2, 0     // tempo 6: volta para o topo
];
const escalas = [
    1, 1, 1,    // tempo 0: escala original
    2, 2, 2,    // tempo 2: dobra de tamanho
    1.5, 1.5, 1.5, // tempo 4: um pouco maior
    1, 1, 1     // tempo 6: volta ao tamanho original
];

// 6. Criar uma animação para mover o cubo
let posTrack = new THREE.KeyframeTrack(
    '.position', // Caminho de propriedade (posição do cubo)
    tempos,      // Tempos para a animação
    posicoes     // Valores de posição
);

let scaleTrack = new THREE.KeyframeTrack(
    '.scale',    // Caminho de propriedade (escala do cubo)
    tempos,      // Tempos para a animação
    escalas      // Valores de escala
);

let emissiveTrack = new THREE.KeyframeTrack(
    '.material.emissive', // Caminho de propriedade (emissivo do material)
    tempos,               // Tempos para a animação
    [136, 68, 238]              // Valores emissivos (ex: [r, g, b])
);


// Criar um AnimationClip que contém a animação
const clip = new THREE.AnimationClip('move', -1, [posTrack, scaleTrack, emissiveTrack]);

// Adicionar o clip ao mixer
const action = mixer.clipAction(clip);
action.play();  // Iniciar a animação




// 7. Função de animação
function animate() {
    requestAnimationFrame(animate);

    // Atualiza o mixer de animações a cada frame
    const delta = clock.getDelta(); // O delta representa o tempo desde o último quadro
    mixer.update(delta);

    // Renderizar a cena
    renderer.render(scene, camera);
}

// 8. Configurar um relógio para medir o tempo entre os frames
const clock = new THREE.Clock();

// 9. Chamar a função de animação
animate();


} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}