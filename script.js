document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    // Dark mode is the default on a first visit. Keep the user's choice afterward.
    const savedTheme = localStorage.getItem("theme");
    const startDark = savedTheme ? savedTheme === "dark" : true;
    body.classList.toggle("dark", startDark);
    updateThemeButton();

    function updateThemeButton() {
        if (!themeToggle) return;
        const isDark = body.classList.contains("dark");
        themeToggle.textContent = isDark ? "☀️" : "🌙";
        themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
        themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isDark = body.classList.toggle("dark");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            updateThemeButton();
        });
    }

    // Smooth-scroll to valid in-page targets, accounting for the fixed header.
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            if (navMenu) navMenu.classList.remove("active");
            if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // Contact form: prepares an email in the visitor's default mail app.
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();
            const subject = document.getElementById("contact-subject").value.trim();
            const message = document.getElementById("contact-message").value.trim();
            if (!subject || !message) return;
            const mailto = `mailto:sonkar9545@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
            window.location.href = mailto;
        });
    }

    // Mobile navigation.
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });
    }
});
