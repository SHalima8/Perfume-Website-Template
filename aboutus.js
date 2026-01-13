  let scene, camera, renderer, model;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  init();
  animate();

  function init() {
    // Create scene and renderer
    scene = new THREE.Scene();
    const canvas = document.getElementById('bg-canvas');
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set up camera
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Load petal model
    const loader = new THREE.GLTFLoader();
    loader.load('petal.glb', function(gltf) {
      model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5);  // Resize as needed
      scene.add(model);
    });

    // Mouse movement tracking
   document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});


    // Responsive canvas
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  }

// Clamp helper function
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function animate() {
  requestAnimationFrame(animate);

  // Smooth interpolation
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  if (model) {
    // Calculate proposed position
    let posX = targetX * 3;
    let posY = -targetY * 3;

    // Clamp position to screen bounds
    posX = clamp(posX, -2.5, 2.5); 
    posY = clamp(posY, -1.5, 1.5);

    model.position.x = posX;
    model.position.y = posY;

    // Optional: subtle rotation effect
    model.rotation.y = targetX * 0.5;
    model.rotation.x = targetY * 0.5;
  }

  renderer.render(scene, camera);
}

   const faders = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // fade out again on scroll out
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(el => observer.observe(el));
   document.querySelectorAll('.faces-images').forEach(box => {
    box.addEventListener('click', () => {
      // Toggle 'tapped' class to show/hide caption
      box.classList.toggle('tapped');

      // Optional: Close others
      document.querySelectorAll('.faces-images').forEach(otherBox => {
        if (otherBox !== box) {
          otherBox.classList.remove('tapped');
        }
      });
    });
  });
     const menuToggle = document.querySelector('.menu-toggle');
  const navContainer = document.querySelector('.nav-container');

  menuToggle.addEventListener('click', () => {
    navContainer.classList.toggle('open');
  });
  