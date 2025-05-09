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
    setTimeout(() => {
      cookieConsent.style.display = 'block';
      console.log('Cookie consent popup displayed');
    }, 13000);
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
    const walletAddress = DOMPurify.sanitize(document.getElementById('walletAddress').value);
    const xHandle = DOMPurify.sanitize(document.getElementById('xHandle').value);
    const email = DOMPurify.sanitize(document.getElementById('email').value);
    const walletRegex = /^symban1[a-z0-9]{39}$/;
    const xHandleRegex = /^@[A-Za-z0-9_]{1,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!walletRegex.test(walletAddress)) {
      alert('Invalid SymbanChain wallet address. Must start with symban1 and be 43 characters.');
      return;
    }
    if (!xHandleRegex.test(xHandle)) {
      alert('Invalid X handle. Must start with @ and be 1-15 characters (letters, numbers, underscores).');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Invalid email address.');
      return;
    }
    alert('Airdrop Claim Submitted! If you’re among the first 10,000 users and meet the criteria (retweet, follow @SymbanChain on X), you’ll receive 1,000 $SYMBAN at launch. Check your email for confirmation! 🌌');
    airdropModal.style.display = 'none';
    console.log('Airdrop form submitted:', { walletAddress, xHandle, email });
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

      // Resize handler
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
  console.error('Three.js not loaded');
}

// Hero Section Animation
if (typeof gsap !== 'undefined') {
  const holoLogo = document.getElementById('holoLogo');
  const particles = document.querySelectorAll('.holo-logo .particle-3, .holo-logo .particle-4, .holo-logo::before, .holo-logo::after');
  const brandName = document.querySelector('.brand-name');
  const heroTagline = document.getElementById('heroTagline');
  const taglineLetters = heroTagline.querySelectorAll('span');
  const heroSubheading = document.querySelector('.hero-subheading');
  const subheadingParts = heroSubheading.querySelectorAll('.subheading-part, .highlight');
  const actionButtons = document.querySelectorAll('.holo-action-btn');

  if (holoLogo && particles.length && brandName && heroTagline && taglineLetters.length && heroSubheading && subheadingParts.length && actionButtons.length) {
    gsap.timeline()
      .fromTo(holoLogo, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
      )
      .to(holoLogo, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      }, "-=0.5")
      .fromTo(particles, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.5, stagger: 0.1 }, 
        2
      )
      .fromTo(brandName, 
        { opacity: 0, scale: 0.5, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 2.5, ease: 'power3.out' }, 
        "-=1"
      )
      .fromTo(taglineLetters, 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 0.05, stagger: 0.05, ease: 'power2.out' }, 
        "-=0.5"
      )
      .fromTo(subheadingParts, 
        { opacity: 0, scale: 1.2 }, 
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.3, ease: 'power2.out' }, 
        "+=0.5"
      )
      .fromTo(actionButtons, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' }, 
        "-=0.5"
      );
    console.log('Hero section animation started');
  } else {
    console.error('Hero section elements not found');
  }
} else {
  console.error('GSAP not loaded');
}

// GSAP Scroll Animations for USP Cards
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
