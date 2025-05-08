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
        alert('Airdrop claim submitted! You’ll receive 1,000 $SYMBAN if you’re among the first 10,000 users.');
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

// Holographic Logo Animation
const holoLogo = document.getElementById('holoLogo');
if (holoLogo) {
    gsap.fromTo(holoLogo, 
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
    );
    console.log('Holographic logo animation started');
} else {
    console.error('Holo logo element not found');
}

// GSAP Scroll Animations
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    console.log('GSAP and ScrollTrigger loaded, initializing animations');

    const uspCards = document.querySelectorAll('.holo-usp-card');
    if (uspCards.length > 0) {
        uspCards.forEach((element, index) => {
            console.log(`Setting up GSAP animation for USP card ${index + 1}`);
            gsap.fromTo(element, 
                {
                    opacity: 0,
                    y: 150,
                    rotationY: 45
                },
                {
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 100%',
                        end: 'top 30%',
                        scrub: 2,
                        markers: false
                    },
                    opacity: 1,
                    y: -50,
                    rotationY: -15,
                    duration: 1.5,
                    delay: index * 0.2,
                    ease: 'power2.out',
                    onStart: () => console.log(`Animation started for USP card ${index + 1}`),
                    onComplete: () => console.log(`Animation completed for USP card ${index + 1}`)
                }
            );

            element.addEventListener('mouseenter', () => {
                console.log(`Hover started for USP card ${index + 1}`);
            });
            element.addEventListener('mouseleave', () => {
                console.log(`Hover ended for USP card ${index + 1}`);
            });
        });
        console.log('GSAP scroll animations initialized for USP cards');
    } else {
        console.error('No USP cards found for GSAP animation');
    }

    const menuLinks = document.querySelectorAll('.holo-link, .holo-toggle');
    menuLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
            console.log(`Hover started for menu item ${index + 1}`);
        });
        link.addEventListener('mouseleave', () => {
            console.log(`Hover ended for menu item ${index + 1}`);
        });
    });
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

// Hamburger Menu Toggle for Mobile
const hamburger = document.createElement('button');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '☰';
document.querySelector('header').insertBefore(hamburger, document.querySelector('nav'));

const navMenu = document.querySelector('nav ul');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
    console.log('Hamburger menu toggled');
});
