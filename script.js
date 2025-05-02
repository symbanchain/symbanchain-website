// Typewriter Effect for Welcome Message
const welcomeMessage = "Welcome to the SymbanChain Universe 🌌 – The Only AI-Driven Web3 Gaming Blockchain with <0.1% Rug Pulls, 5-Min Audits, 10,000 TPS, $0.001 Tx Fees, and Staking for 5% of Every New Token!";
const welcomeElement = document.getElementById('welcomeMessage');
let i = 0;

function typeWriter() {
    if (i < welcomeMessage.length) {
        welcomeElement.innerHTML += welcomeMessage.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

window.onload = function() {
    typeWriter();
};

// 3D Galaxy with Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('galaxyCanvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x00eaff, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// IDO Popup
const popup = document.getElementById('idoPopup');
const closeBtn = document.querySelector('.close-btn');

setTimeout(() => {
    popup.style.display = 'flex';
}, 3000);

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Airdrop Form Submission (Mock)
document.getElementById('airdropForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Airdrop claim submitted! You’ll receive 1,000 $SYMBAN if you’re among the first 10,000 users.');
});
