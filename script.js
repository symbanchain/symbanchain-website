console.log('Script.js loaded');

// Cookie Consent Popup
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookiesBtn = document.getElementById('acceptCookies');
const customizeCookiesBtn = document.getElementById('customizeCookies');

if (cookieConsent) {
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieConsent.style.display = 'block';
        console.log('Cookie consent popup displayed');
    }

    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.style.display = 'none';
        console.log('Cookies accepted');
    });

    customizeCookiesBtn.addEventListener('click', () => {
        alert('Customize cookie settings (to be implemented). For now, please accept to continue.');
        console.log('Customize cookies clicked');
    });
} else {
    console.error('Cookie consent elements not found');
}

// Airdrop Modal
const airdropModal = document.getElementById('airdropModal');
const joinAirdropBtn = document.getElementById('joinAirdropBtn');
const closeAirdropModal = document.getElementById('closeAirdropModal');

if (joinAirdropBtn && airdropModal && closeAirdropModal) {
    joinAirdropBtn.addEventListener('click', () => {
        airdropModal.style.display = 'flex';
        console.log('Airdrop modal opened');
    });

    closeAirdropModal.addEventListener('click', () => {
        airdropModal.style.display = 'none';
        console.log('Airdrop modal closed');
    });

    window.addEventListener('click', (e) => {
        if (e.target === airdropModal) {
            airdropModal.style.display = 'none';
            console.log('Airdrop modal closed by clicking outside');
        }
    });

    document.getElementById('airdropForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Airdrop claim submitted! You’ll receive 1,000 $SYMBAN if you’re among the first 10,000 users.');
        airdropModal.style.display = 'none';
        console.log('Airdrop form submitted');
    });
} else {
    console.error('Airdrop modal elements not found');
}

// Cosmic Scene with Three.js
if (typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('cosmicCanvas'), alpha: true });

    if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        console.log('Three.js renderer initialized');

        // Starfield
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });
        const starVertices = [];

        for (let i = 0; i < 5000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);
        }

        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Planets
        const planetGeometry = new THREE.SphereGeometry(5, 32, 32);
        const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x00eaff, wireframe: true });
        const planet1 = new THREE.Mesh(planetGeometry, planetMaterial);
        planet1.position.set(20, 10, -50);
        scene.add(planet1);

        const planet2 = new THREE.Mesh(planetGeometry, planetMaterial);
        planet2.position.set(-30, -15, -70);
        scene.add(planet2);

        camera.position.z = 50;

        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        function animateCosmicScene() {
            requestAnimationFrame(animateCosmicScene);

            camera.position.x += (mouseX * 20 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 20 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            planet1.rotation.y += 0.01;
            planet2.rotation.y += 0.005;

            renderer.render(scene, camera);
        }
        animateCosmicScene();
        console.log('Cosmic scene initialized');
    } else {
        console.error('Cosmic canvas not found');
    }
} else {
    console.error('Three.js not loaded');
}

// Holographic Logo Animation
const holoLogo = document.getElementById('holoLogo');
if (holoLogo) {
    gsap.fromTo(holoLogo, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
    );
    console.log('Holographic logo animation started');
}

// Typewriter Effect for Tagline
const tagline = "SymbanChain: AI-Powered Web3 Gaming Universe";
const taglineElement = document.getElementById('heroTagline');
let i = 0;

function typeWriter() {
    if (i < tagline.length) {
        taglineElement.innerHTML += tagline.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

window.addEventListener('load', () => {
    setTimeout(typeWriter, 2000);
    console.log('Typewriter effect started');
});

// GSAP Scroll Animations
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.holo-usp-card').forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none none',
                markers: false // Set to true for debugging
            },
            opacity: 0,
            y: 50,
            rotationY: 20,
            duration: 1,
            delay: index * 0.2,
            ease: 'power2.out'
        });
    });
    console.log('GSAP scroll animations initialized for USP cards');
} else {
    console.error('GSAP or ScrollTrigger not loaded');
}

// IDO Countdown Timer
const idoStartDate = new Date('June 15, 2025 00:00:00').getTime();
const countdownTimer = document.getElementById('countdownTimer');

if (countdownTimer) {
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
            countdownTimer.innerHTML = '<p>IDO is Live!</p>';
            console.log('IDO countdown finished');
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
    console.log('IDO countdown started');
} else {
    console.error('Countdown timer elements not found');
}
