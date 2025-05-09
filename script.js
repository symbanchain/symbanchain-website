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
    const taglineLetters = heroTagline.querySelectorAll('span');
    const heroSubheading = document.querySelector('.hero-subheading');
    const highlights = document.querySelectorAll('.hero-subheading .highlight');
    const actionButtons = document.querySelectorAll('.holo-action-btn');

    if (holoLogo && heroTagline && taglineLetters.length && heroSubheading && highlights.length && actionButtons.length) {
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
            // Tagline entrance (letter-by-letter)
            .fromTo(taglineLetters, 
                { opacity: 0, scale: 0.8 }, 
                { opacity: 1, scale: 1, duration: 0.05, stagger: 0.05, ease: 'power2.out' }, 
                "-=1"
            )
            // Subheading entrance (word-by-word)
            .fromTo(heroSubheading, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.1 }, 
                "+=0.5"
            )
            .fromTo(highlights, 
                { opacity: 0, textShadow: '0 0 0 #ffd700' }, 
                { opacity: 1, textShadow: '0 0 15px #ffd700', duration: 1, stagger: 0.5, ease: 'power2.out' }, 
                "-=0.1"
            )
            // Action buttons entrance
            .fromTo(actionButtons, 
                { y: 20, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' }, 
                "+=0.5"
            );

        console.log('Hero section animation started');
    } else {
        console.error('Hero section elements not found');
    }
} else {
    console.error('GSAP not loaded');
}

// GSAP Scroll Animations and USP Connections
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    console.log('GSAP and ScrollTrigger loaded, initializing animations');

    // USP Card Animations
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

        // Dynamic USP Connections with Hexagonal Paths and Cosmic Effects
        const uspSvg = document.querySelector('.usp-connections');
        if (uspSvg) {
            // Set SVG dimensions based on the grid
            const grid = document.querySelector('.holo-usp-grid');
            const gridRect = grid.getBoundingClientRect();
            uspSvg.setAttribute('viewBox', `0 0 ${gridRect.width} ${gridRect.height}`);

            // Define connections (based on card order)
            const connections = [
                { from: 'usp1', to: 'usp2' },
                { from: 'usp2', to: 'usp3' },
                { from: 'usp3', to: 'usp4' },
                { from: 'usp4', to: 'usp5' },
                { from: 'usp5', to: 'usp6' },
                { from: 'usp6', to: 'usp7' },
                { from: 'usp7', to: 'usp8' },
                { from: 'usp8', to: 'usp9' },
                { from: 'usp9', to: 'usp1' },
            ];

            // Function to draw hexagonal paths and particles
            const drawConnections = () => {
                uspSvg.innerHTML = ''; // Clear previous paths

                // Define gradient for cosmic effect
                const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                gradient.setAttribute('id', 'cosmicGradient');
                gradient.setAttribute('x1', '0%');
                gradient.setAttribute('y1', '0%');
                gradient.setAttribute('x2', '100%');
                gradient.setAttribute('y2', '100%');
                const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop1.setAttribute('offset', '0%');
                stop1.setAttribute('style', 'stop-color:#00eaff;stop-opacity:1');
                const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop2.setAttribute('offset', '100%');
                stop2.setAttribute('style', 'stop-color:#ffd700;stop-opacity:1');
                gradient.appendChild(stop1);
                gradient.appendChild(stop2);
                defs.appendChild(gradient);
                uspSvg.appendChild(defs);

                connections.forEach((connection, index) => {
                    const fromCard = document.querySelector(`[data-id="${connection.from}"]`);
                    const toCard = document.querySelector(`[data-id="${connection.to}"]`);

                    if (fromCard && toCard) {
                        const fromRect = fromCard.getBoundingClientRect();
                        const toRect = toCard.getBoundingClientRect();
                        const gridRect = grid.getBoundingClientRect();

                        // Calculate center points relative to the grid
                        const fromX = fromRect.left + fromRect.width / 2 - gridRect.left;
                        const fromY = fromRect.top + fromRect.height / 2 - gridRect.top;
                        const toX = toRect.left + toRect.width / 2 - gridRect.left;
                        const toY = toRect.top + toRect.height / 2 - gridRect.top;

                        // Calculate hexagonal path points (avoiding text)
                        const offset = 30; // Offset from card edges to avoid text
                        const midX = (fromX + toX) / 2;
                        const midY = (fromY + toY) / 2;

                        // Hexagonal path points
                        const hexPoints = [
                            fromX, fromY,
                            fromX + (toX > fromX ? offset : -offset), fromY + (toY > fromY ? offset : -offset),
                            midX, midY - offset,
                            midX, midY + offset,
                            toX + (toX > fromX ? -offset : offset), toY + (toY > fromY ? -offset : offset),
                            toX, toY
                        ];

                        // Create path
                        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        const d = `M${hexPoints[0]},${hexPoints[1]} L${hexPoints[2]},${hexPoints[3]} L${hexPoints[4]},${hexPoints[5]} L${hexPoints[6]},${hexPoints[7]} L${hexPoints[8]},${hexPoints[9]} L${hexPoints[10]},${hexPoints[11]}`;
                        path.setAttribute('d', d);
                        path.setAttribute('stroke', 'url(#cosmicGradient)');
                        path.setAttribute('stroke-width', '2');
                        path.setAttribute('stroke-opacity', '0.5');
                        path.setAttribute('fill', 'none');
                        path.setAttribute('id', `connection-${index}`);

                        uspSvg.appendChild(path);

                        // Animate path opacity
                        gsap.to(path, {
                            'stroke-opacity': 0.8,
                            duration: 1.5,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut'
                        });

                        // Add particle effect along the path
                        for (let i = 0; i < 3; i++) {
                            const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                            particle.setAttribute('r', '2');
                            particle.setAttribute('fill', '#00eaff');
                            particle.setAttribute('id', `particle-${index}-${i}`);
                            uspSvg.appendChild(particle);

                            gsap.to(particle, {
                                motionPath: {
                                    path: path,
                                    align: path,
                                    alignOrigin: [0.5, 0.5],
                                    autoRotate: true
                                },
                                duration: 3,
                                repeat: -1,
                                ease: 'none',
                                delay: i * 1,
                                repeatDelay: 0
                            });
                        }
                    }
                });
            };

            // Initial draw
            drawConnections();

            // Redraw on resize
            window.addEventListener('resize', drawConnections);

            // Redraw after scroll animations
            ScrollTrigger.addEventListener('refresh', drawConnections);

            console.log('USP connections initialized');
        } else {
            console.error('USP connections SVG not found');
        }
    } else {
        console.error('No USP cards found for GSAP animation');
    }

    // Debug hover events for top menu items
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
