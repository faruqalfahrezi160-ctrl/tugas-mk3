document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initStatsCounter();
  initModals();
  initContactForm();
  initSmoothScroll();
});
/* ==========================================
   1. Navbar Scroll Effect
   ========================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    // ScrollSpy for Active Nav Link
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {        currentSection = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================
   2. Mobile Drawer Navigation
   ========================================== */
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.close-btn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  function openMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }
  if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;
  const observerOptions = {
    threshold: 0.5
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 2000;
          const stepTime = Math.abs(Math.floor(duration / target));
          const timer = setInterval(() => {
            count += Math.ceil(target / 40);
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            stat.textContent = count.toLocaleString('id-ID') + suffix;
          }, 40);
        });
      }
    });
  }, observerOptions);
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

const programData = {
  rpl: {
    title: "Rekayasa Perangkat Lunak (RPL)",
    badge: "Teknologi Informasi",
    description: "Program keahlian RPL menyiapkan lulusan mendalam di bidang Software Development, Web Engineering, Mobile App Development (Android/iOS), dan Database Architecture dengan standar kurikulum industri terkini.",
    curriculum: ["Web Development (HTML, CSS, JS, React, Node.js)", "Mobile Application (Flutter / Kotlin)", "Database Management (MySQL, PostgreSQL)", "UI/UX Design & Prototyping", "Cloud & RESTful API Development"],
    prospects: ["Fullstack Web Developer", "Mobile App Developer", "Frontend / Backend Specialist", "Software QA Engineer"]
  },
  tkj: {
    title: "Teknik Komputer & Jaringan (TKJ)",
    badge: "Infrastruktur & Cloud",
    description: "Fokus pada penguasaan infrastruktur jaringan komputer, Administrasi Server, Cloud Computing, Cyber Security, serta Pengelolahan Perangkat Router & Switch Mikrotik & Cisco.",
    curriculum: ["Network Infrastructure (Cisco CCNA standard)", "MikroTik Certified Network Associate", "Linux & Windows Server Administration", "Cloud Computing & Virtualization", "Network Security & Ethical Hacking"],
    prospects: ["Network Engineer", "System Administrator", "Cloud Specialist", "Cyber Security Analyst"]
  },
  dkv: {
    title: "Desain Komunikasi Visual (DKV)",
    badge: "Industri Kreatif",
    description: "Mengembangkan potensi kreatif siswa dalam pembuatan media komunikasi visual modern, UI/UX Design, Animation 2D/3D, Videografi, Digital Branding, dan Motion Graphics.",
    curriculum: ["Graphic Design (Adobe Illustrator, Photoshop)", "UI/UX & Interactive Design (Figma)", "Videography & Video Editing (Premiere, After Effects)", "3D Modeling & Animation (Blender)", "Digital Branding & Advertising"],
    prospects: ["UI/UX Designer", "Motion Graphic Artist", "Graphic Designer", "Video Editor & Content Creator"]
  }
};
    