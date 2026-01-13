
  const labels = document.querySelectorAll('.label-box');
  labels.forEach(label => {
    label.addEventListener('click', () => {
      label.classList.toggle('clicked');
    });
  });

  const faders = document.querySelectorAll('.fade-in');

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only fade in once
      }
    });
  }, {
    threshold: 0.2
  });

  faders.forEach(el => {
    appearOnScroll.observe(el);
  });
  const faderss = document.querySelectorAll('.fade-in');

  const appearsOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  faderss.forEach(el => {
    appearsOnScroll.observe(el);
  })
    const menuToggle = document.querySelector('.menu-toggle');
  const navContainer = document.querySelector('.nav-container');

  menuToggle.addEventListener('click', () => {
    navContainer.classList.toggle('open');
  });