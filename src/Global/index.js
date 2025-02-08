document.addEventListener('DOMContentLoaded', () => {

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const menuLinks = document.querySelectorAll('nav a');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });


  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    }
  });

  // Smooth scroll para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
  });

  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const email = document.getElementById("email").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toastify({
        text: "Por favor, insira um e-mail válido!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#FF0000"
      }).showToast();
      return;
    }

    fetch(form.action, {
      method: "POST",
      body: formData
    }).then(response => {
      if (response.ok) {
        Toastify({
          text: "Mensagem enviada com sucesso!",
          duration: 3000,
          gravity: "top",
          position: "left",
          backgroundColor: "#4CAF50"
        }).showToast();
        form.reset();
      } else {
        Toastify({
          text: "Erro ao enviar a mensagem!",
          duration: 3000,
          gravity: "top",
          position: "left",
          backgroundColor: "#FF0000"
        }).showToast();
      }
    }).catch(error => {
      console.error("Erro:", error);
      Toastify({
        text: "Ocorreu um erro ao enviar sua mensagem.",
        duration: 3000,
        gravity: "top",
        position: "left",
        backgroundColor: "#FF0000"
      }).showToast();
    });
  });
});