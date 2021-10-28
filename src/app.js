import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();

// Paleta de colores
const palette = {
  bgColor: '#2c3e50', // CSS String
  planeColor: 0x0385AF, // HEX
};

let spotLight;
let objects = {};

document.body.onload = () => {
  main();
};

//daptar la ventana 
window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, true);
};

function main() {
  // Configurracion inicial
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(palette.bgColor, 1);
  document.body.appendChild(renderer.domElement);

  camera.position.x = 0;
  camera.position.y = -5;
  camera.position.z = .5;

  // Controls
  new OrbitControls(camera, renderer.domElement);

  const geometry = new THREE.PlaneGeometry(40, 40, );
  const material = new THREE.MeshBasicMaterial({
    color: palette.planeColor,
    side: THREE.DoubleSide,
  });

  const CubeGeometry = new THREE.BoxGeometry();
  const CubeMaterial = new THREE.MeshBasicMaterial({
      color:0x03AF5E,
  });

  const cube = new THREE.Mesh(CubeGeometry,CubeMaterial);
  const plane = new THREE.Mesh(geometry, material);

  //CUBO
  cube.position.z=1;
  objects.cubo=cube;
  scene.add(cube);
  console.log(objects);
 
  //PLANO 
  objects.plano = plane;
  scene.add(plane);
  console.log(objects);

  // Light
  setupLights();

  //interaccion con teclas 
  interaction();

  animate();    
}


  

//Interaccion de teclas
function interaction(){
    window.addEventListener('keydown',(e)=>{
    let tecla = e.key;
    console.log(e.key)
    switch(tecla){
        case 'w':
        camera.position.y=camera.position.y+0.5;
        break;
        
        case 's':
        camera.position.y=camera.position.y-0.5;
        break;
        case 'd':
        camera.position.x=camera.position.x+0.5;
        break;
        case 'a':
        camera.position.x=camera.position.x-0.5;
        break;
        case 'Shift':
        camera.position.z=camera.position.z+0.5;
        break;
        case 'Control':
        camera.position.z=camera.position.z-0.5;
        break;
        
                
    }
    })
}

function setupLights() {
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(0, 10, 0);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 200;

  spotLight.castShadow = true;
  scene.add(spotLight);
}

function animate() {
  requestAnimationFrame(animate);
  updateElements();
  renderer.render(scene, camera);
}

//setear colores
function updateElements() {
  renderer.setClearColor(palette.bgColor, 1);
  objects.plano.material.color = new THREE.Color(palette.planeColor);
}
