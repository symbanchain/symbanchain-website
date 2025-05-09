import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';

console.log('Script.js loaded');

// Debug Logo Loading
const headerLogo = document.querySelector('.logo-img');
const footerLogo = document.querySelector('.footer-logo');
const heroLogo = document.querySelector('.holo-logo');

if (headerLogo) {
    headerLogo.addEventListener('load', () => console.log('Header logo loaded successfully'));
    headerLogo.addEventListener('error', () => console.error('Header logo failed to load:', headerLogo.src));
}

if (footerLogo) {
    footerLogo.addEventListener('load', () => console.log('Footer logo loaded successfully'));
    footerLogo.addEventListener('error', () => console.error('Footer logo failed to load:', footerLogo.src));
}

if (heroLogo) {
    console.log('Hero logo (background image) set to:', getComputedStyle(heroLogo).backgroundImage);
}

// Cookie Consent Popup
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookiesBtn = document.getElementById('acceptCookies');
const customizeCookiesBtn = document.getElementById('customizeCookies');

if (cookieConsent) {
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieConsent.style.display = 'block';
        console.log('Cookie consent popup displayed');
    } else {
        console.log('Cookies already accepted, popup not shown');
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
        alert('Airdrop Claim Submitted! If you’re among the first 10,000 users and meet the criteria (retweet, follow @SymbanChain on X, join Telegram), you’ll receive 1,000 $SYMBAN in May 2025. Check your e-mail for confirmation! 🌌');
        airdropModal.style.display = 'none';
        console.log('Airdrop form submitted');
    });
} else {
    console.error('Airdrop modal elements not found');
}

// Cosmic Scene with Three.js (Static Starfield)
let scene, camera, renderer;

if (typeof THREE !== 'undefined') {
    try {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('cosmicCanvas'), alpha: true });

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

            camera.position.z = 50;

            function animateCosmicScene() {
                requestAnimationFrame(animateCosmicScene);
                renderer.render(scene, camera);
            }
            animateCosmicScene();
            console.log('Cosmic scene initialized successfully');

            // Resize handler for responsive canvas
            window.addEventListener('resize', () => {
                const width = window.innerWidth;
                const height = window.innerHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                console.log('Canvas resized for cosmic scene');
            });
        } else {
            console.error('Cosmic canvas not found');
        }
    } catch (error) {
        console.error('Error initializing cosmic scene:', error);
    }
} else {
    console.error('Three.js not loaded - ensure the CDN URL is correct and loaded before this script');
}

// Hero Section Animation
if (typeof gsap !== 'undefined') {
    const holoLogo = document.getElementById('holoLogo');
    const heroTagline = document.getElementById('heroTagline');
    const heroSubheading = document.querySelector('.hero-subheading');
    const highlights = document.querySelectorAll('.hero-subheading .highlight');
    const actionButtons = document.querySelectorAll('.holo-action-btn');

    if (holoLogo && heroTagline && heroSubheading && highlights.length && actionButtons.length) {
        gsap.timeline()
            // Logo entrance
            .fromTo(holoLogo, 
                { scale: 0, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 2, ease: 'power2.out', 
                  onComplete: () => {
                      gsap.to(holoLogo, {
                          scale: 1.1,
                          duration: 1.5,
                          repeat: -1,
                          yoyo: true,
                          ease: 'sine.inOut'
                      });
                  }
                }
            )
            // Tagline entrance
            .fromTo(heroTagline, 
                { y: 20, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 
                "-=1"
            )
            // Subheading entrance (word-by-word)
            .fromTo(heroSubheading, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.1 }, 
                "-=0.5"
            )
            .fromTo(highlights, 
                { opacity: 0, textShadow: '0 0 0 #00eaff' }, 
                { opacity: 1, textShadow: '0 0 15px #00eaff', duration: 0.5, stagger: 0.3, ease: 'power2.out' }, 
                "-=0.4"
            )
            // Action buttons entrance
            .fromTo(actionButtons, 
                { y: 20, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' }, 
                "-=0.2"
            );

        console.log('Hero section animation started');
    } else {
        console.error('Hero section elements not found');
    }
}
