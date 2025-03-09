document.addEventListener("DOMContentLoaded", function () {
    const typingText = document.getElementById("typing-text");
    const bioText = document.getElementById("bio-text");
    const aboutMeText = document.querySelector(".about-me");

    bioText.style.opacity = "0";
    aboutMeText.style.opacity = "0";

    const words = ["Aspiring Software Engineer | Web Developer | Python Enthusiast"];
    let charIndex = 0;

    function typeEffect() {
        let currentWord = words[0];
        let displayedText = currentWord.substring(0, charIndex++);

        typingText.innerHTML = displayedText;

        if (charIndex === currentWord.length + 1) {
            setTimeout(showBioText, 500);
        } else {
            setTimeout(typeEffect, 50);
        }
    }

    function showBioText() {
        bioText.style.opacity = "1";
        bioText.style.transition = "opacity 1.2s ease-in-out";

        setTimeout(showAboutMeText, 800);
    }

    function showAboutMeText() {
        aboutMeText.style.opacity = "1";
        aboutMeText.style.transform = "translateY(0)";
        aboutMeText.style.transition = "opacity 1s ease-in-out, transform 0.8s ease-in-out";
    }

    typeEffect();

    // Particle Animation
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let particlesArray = [];

    class Particle {
        constructor(x, y, size, color, speedX, speedY, glow = false) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.speedX = speedX;
            this.speedY = speedY;
            this.glow = glow;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.03;

            if (this.glow) {
                this.size += 0.05 * Math.sin(Date.now() * 0.005);
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();

            if (this.glow) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
            }
        }
    }

    function handleParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesArray.forEach((particle, index) => {
            particle.update();
            particle.draw();

            if (particle.size <= 0.2) {
                particlesArray.splice(index, 1);
            }
        });

        requestAnimationFrame(handleParticles);
    }

    function spawnParticles() {
        for (let i = 0; i < 5; i++) { // Increased the number of particles per interval
            const size = Math.random() * 3 + 1;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speedX = (Math.random() - 0.5) * 1;
            const speedY = (Math.random() - 0.5) * 1;
            const color = Math.random() > 0.5 ? "#64FFDA" : "#ffffff";

            particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
        }

        // Add occasional glowing particles
        if (Math.random() > 0.8) {
            const glowSize = Math.random() * 5 + 3;
            particlesArray.push(new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                glowSize,
                "#FFD700",
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5,
                true
            ));
        }

        // Add occasional shooting star effect
        if (Math.random() > 0.9) {
            particlesArray.push(new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                4,
                "#FF4500",
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            ));
        }
    }

    setInterval(spawnParticles, 80); // Spawns more frequently

    handleParticles();
});


document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scroll for About Section
    document.querySelector(".nav-links li a[href='#about-page']").addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("about-page").scrollIntoView({ behavior: "smooth" });
    });

    // Particle Animation for About Page
    const aboutCanvas = document.getElementById("aboutCanvas");
    const ctx = aboutCanvas.getContext("2d");

    aboutCanvas.width = aboutCanvas.offsetWidth;
    aboutCanvas.height = aboutCanvas.offsetHeight;

    let particlesArray = [];

    class Particle {
        constructor(x, y, size, color, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.speedX = speedX;
            this.speedY = speedY;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.01;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function handleParticles() {
        ctx.clearRect(0, 0, aboutCanvas.width, aboutCanvas.height);
        particlesArray.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.size <= 0.2) {
                particlesArray.splice(index, 1);
            }
        });
        requestAnimationFrame(handleParticles);
    }

    function spawnParticles() {
        for (let i = 0; i < 3; i++) {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * aboutCanvas.width;
            const y = Math.random() * aboutCanvas.height;
            const speedX = (Math.random() - 0.5) * 1;
            const speedY = (Math.random() - 0.5) * 1;
            const color = Math.random() > 0.5 ? "#64FFDA" : "#ffffff";
            particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
        }
    }

    setInterval(spawnParticles, 100);
    handleParticles();
});
