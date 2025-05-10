document.addEventListener('DOMContentLoaded', () => {
    console.log("Hero section animation started");

    // Logo Zoom-In Animation
    gsap.from(".s-logo", {
        scale: 0,
        opacity: 0,
        duration: 2,
        ease: "elastic.out(1, 0.3)"
    });

    // Particle Animation Delay
    gsap.from(".particle", {
        opacity: 0,
        duration: 0.5,
        delay: 2
    });

    // SymbanChain Text Animation
    gsap.from(".brand-name", {
        opacity: 0,
        scale: 0.5,
        duration: 2.5,
        ease: "power2.out"
    });

    // Tagline Letter-by-Letter Animation
    const tagline = document.querySelector(".hero-content h1");
    const text = tagline.textContent;
    tagline.textContent = "";
    text.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        tagline.appendChild(span);
    });

    gsap.from(tagline.children, {
        opacity: 0,
        y: 20,
        duration: 0.05,
        stagger: 0.03,
        ease: "power1.out"
    });

    // Subheading Animation
    const subheading = document.querySelector(".hero-subheading");
    const subheadingParts = subheading.innerHTML.split(/(<span class="highlight">.*?<\/span>)/g).map(part => {
        const span = document.createElement("span");
        span.innerHTML = part;
        return span;
    });
    subheading.innerHTML = "";
    subheadingParts.forEach(part => subheading.appendChild(part));

    gsap.from(subheading.children, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.3,
        ease: "power1.out"
    });

    // Action Buttons Animation
    gsap.from(".holo-action-btn", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".holo-actions",
            start: "top 80%"
        }
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navUl = document.querySelector("nav ul");
    hamburger.addEventListener("click", () => {
        navUl.classList.toggle("active");
        hamburger.textContent = navUl.classList.contains("active") ? "✖" : "☰";
    });

    // Airdrop Form Submission (Mock)
    document.getElementById("airdropForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Airdrop claim submitted! You’ll receive 1,000 $SYMBAN if you’re among the first 10,000 users.");
    });

    // Cookie Consent Popup
    const cookieConsent = document.getElementById("cookieConsent");
    const acceptCookies = document.getElementById("acceptCookies");
    
    if (!localStorage.getItem("cookiesAccepted")) {
        setTimeout(() => {
            cookieConsent.style.display = "block";
            console.log("Cookie consent popup displayed");
        }, 13000);
    }

    acceptCookies.addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", "true");
        cookieConsent.style.display = "none";
    });
});
