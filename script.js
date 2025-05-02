// Cookie Consent Popup
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookiesBtn = document.getElementById('acceptCookies');
const customizeCookiesBtn = document.getElementById('customizeCookies');

if (!localStorage.getItem('cookiesAccepted')) {
    cookieConsent.style.display = 'block';
}

acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.style.display = 'none';
});

customizeCookiesBtn.addEventListener('click', () => {
    alert('Customize cookie settings (to be implemented). For now, please accept to continue.');
});

// Airdrop Modal
const airdropModal = document.getElementById('airdropModal');
const joinAirdropBtn = document.getElementById('joinAirdropBtn');
const closeAirdropModal = document.getElementById('closeAirdropModal');

joinAirdropBtn.addEventListener('click', () => {
    airdropModal.style.display = 'flex';
});

closeAirdropModal.addEventListener('click', () => {
    airdropModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === airdropModal) {
        airdropModal.style.display = 'none';
    }
});

document.getElementById('airdropForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Airdrop claim submitted! You’ll receive 1,000 $SYMBAN if you’re among the first 10,000 users.');
    airdropModal.style.display = 'none';
});

// Constellation Effect with Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('constellationCanvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create stars to form an 'S' shape
const stars = [];
const sShape = [
    { x: -5, y: 5 }, { x: -3, y: 5 }, { x: -1, y: 5 }, { x: 1, y: 5 }, { x: 3, y: 5 }, { x: 5, y: 5 }, // Top horizontal
    { x: 5, y: 3 }, { x: 5, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 1 }, // Right vertical
    { x: -1, y: 1 }, { x: -3, y: 1 }, { x: -5, y: 1 }, { x: -5, y: -1 }, { x: -5, y: -3 }, // Middle horizontal
    { x: -5, y: -5 }, { x: -3, y: -5 }, { x: -1, y: -5 }, { x: 1, y: -5 }, { x: 3, y: -5 }, { x: 5, y: -5 }, // Bottom horizontal
    { x: 5, y: -3 }, { x: 5, y: -1 } // Left vertical
];

sShape.forEach(point => {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00eaff });
    const star = new THREE.Mesh(geometry, material);
    star.position.set(point.x * 2, point.y * 2, 0);
    stars.push(star);
    scene.add(star);
});

camera.position.z = 30;

function animateStars() {
    requestAnimationFrame(animateStars);
    stars.forEach(star => {
        star.scale.set(
            1 + Math.sin(Date.now() * 0.002) * 0.2,
            1 + Math.sin(Date.now() * 0.002) * 0.2,
            1 + Math.sin(Date.now() * 0.002) * 0.2
        );
    });
    renderer.render(scene, camera);
}
animateStars();

// IDO Countdown Timer
const idoStartDate = new Date('June 15, 2025 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = idoStartDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdownTimer').innerHTML = '<p>IDO is Live!</p>';
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
