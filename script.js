/* --- 1. HEADER CHANGE ON SCROLL --- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* --- 2. SCROLL ANIMATIONS (Intersection Observer) --- */
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animation joue une seule fois
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});

/* --- 3. CORPORATE EMAIL VALIDATION --- */
const form = document.getElementById('partnerForm');
const emailInput = document.getElementById('businessEmail');
const errorMsg = document.getElementById('errorMsg');

// Liste des domaines à bloquer
const freeEmailDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'outlook.com', 
    'icloud.com', 'mail.com', 'protonmail.com', 'yandex.com', 'live.com'
];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    // Sécurisation simple contre les erreurs si pas de @
    const domain = email.includes('@') ? email.split('@')[1] : '';

    if (!email || !email.includes('@')) {
        showError("Please enter a valid email address.");
        return;
    }

    if (freeEmailDomains.includes(domain)) {
        showError("Please use your company email address (no public domains).");
    } else {
        errorMsg.style.display = 'none';
        alert("Success! Application started with: " + email);
        form.reset();
    }
});

function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.style.display = 'block';
    // Animation de secousse (définie dans style.css)
    form.style.animation = 'shake 0.5s ease';
    setTimeout(() => form.style.animation = '', 500);
}