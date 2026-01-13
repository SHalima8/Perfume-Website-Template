const glowContainer = document.getElementById("glow-container");
const trailLength = 25;
const trail = [];

for (let i = 0; i < trailLength; i++) {
  const dot = document.createElement("div");
  dot.classList.add("glow-trail-dot");
  glowContainer.appendChild(dot);
  trail.push({ el: dot, x: window.innerWidth / 2, y: window.innerHeight / 2 });
}

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateTrail() {
  let x = mouseX;
  let y = mouseY;

  trail.forEach((point, i) => {
   point.x += (x - point.x) * 0.3;
point.y += (y - point.y) * 0.3;

    const scale = 1 - i / trailLength;
    const opacity = 1 - i / trailLength;

    point.el.style.transform = `translate(${point.x}px, ${point.y}px) scale(${scale})`;
    point.el.style.opacity = opacity;

    x = point.x;
    y = point.y;
  });

  requestAnimationFrame(animateTrail);
}

animateTrail();

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Sparkle spawn with some randomness
  if (Math.random() < 0.4) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;

    glowContainer.appendChild(sparkle);

    // Remove the sparkle after animation completes
    setTimeout(() => {
      sparkle.remove();
    }, 800);
  }
});

let angle = 0;
const model = document.querySelector('#bottleModel');

// Optional: disable built-in auto-rotate to avoid double spinning
model.removeAttribute('auto-rotate');

function rotateBottle() {
  angle += 0.01; // 👈 Smaller value = slower
  const radius = 2.5; // 👈 Lock radius to avoid zoom-out
  const phi = 75 * (Math.PI / 180); // vertical angle in radians

  model.cameraOrbit = `${angle}rad ${phi}rad ${radius}m`;
  requestAnimationFrame(rotateBottle);
}

rotateBottle();

 
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo("#bottleModel",
  {
    scale: 1,         // Start slightly smaller
    opacity: 1
  },
  {
    scale: 1.5,         // Grows into focus
    opacity: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#windowTwo",
      start: "top 80%",
      end: "top 30%",
      scrub: true
    }
  }
);

gsap.to(".bottle-wrapper", {
  opacity: 0,
  scale: 0.8,
  scrollTrigger: {
    trigger: "#windowTwo",
    start: "bottom bottom",
    end: "bottom top",
    scrub: true
  }
});

gsap.utils.toArray('.feature-box').forEach((box, i) => {
  gsap.to(box, {
    scrollTrigger: {
      trigger: box,
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    delay: i * 0.1
  });
});


 const radios = document.querySelectorAll('input[name="position"]');
  let current = 0;

  setInterval(() => {
    radios[current].checked = false;
    current = (current + 1) % radios.length;
    radios[current].checked = true;
  }, 2500);

       const menuToggle = document.querySelector('.menu-toggle');
  const navContainer = document.querySelector('.nav-container');

  menuToggle.addEventListener('click', () => {
    navContainer.classList.toggle('open');
  });

  