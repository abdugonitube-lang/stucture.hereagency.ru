
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));
});


const canvas = document.getElementById("hero3d");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 3;


const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

const light = new THREE.PointLight(0x66ccff, 1.3);
light.position.set(3, 3, 5);
scene.add(light);


const geometry = new THREE.IcosahedronGeometry(1.2, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x66ccff,
  wireframe: true,
  transparent: true,
  opacity: 0 
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let fadeIn = 0;
function fadeInMesh() {
  if (fadeIn < 1) {
    fadeIn += 0.01;
    mesh.material.opacity = fadeIn;
    requestAnimationFrame(fadeInMesh);
  }
}
fadeInMesh();


let time = 0;
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.003;
  mesh.rotation.y += 0.004;
  time += 0.02;
  light.intensity = 1.3 + Math.sin(time) * 0.3; 
  renderer.render(scene, camera);
}
animate();


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});