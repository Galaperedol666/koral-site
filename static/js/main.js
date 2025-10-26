// ===== Burger menu toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Close nav on link click (mobile UX)
  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('active'));
  });

  // ===== Smooth scroll for in-page anchors =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Category card click-through to catalogue with filter hint =====
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3')?.textContent?.trim();
      if (title) {
        // Pass category as query param (for future filter handling in catalogue.html)
        window.location.href = `catalogue.html?category=${encodeURIComponent(title)}`;
      } else {
        window.location.href = 'catalogue.html';
      }
    });
  });

  // ===== Keyboard accessibility for category cards =====
  document.querySelectorAll('.category-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // ===== Safe external links (messengers) open in new tab =====
  document.querySelectorAll('.floating-buttons a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
  });
});


// Відкрити модалку
document.querySelectorAll('[data-gallery]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-gallery');
    document.getElementById(id).style.display = 'flex';
  });
});

// Закрити при кліку по бекдропу (поза .modal-content)
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) { // клік саме по бекдропу
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = ''; // відновлюємо скрол
    }
  });
});

// Додатково: закрити по Esc (доступність)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal[aria-hidden="false"]').forEach(modal => {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    });
    document.documentElement.style.overflow = '';
  }
});



// Слайдер для кожної модалки
document.querySelectorAll('.slider').forEach(slider => {
  const slides = slider.querySelectorAll('img');
  let index = 0;
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');

  function showSlide(i) {
    slides.forEach((img, idx) => {
      img.style.display = idx === i ? 'block' : 'none';
    });
  }
  showSlide(index);

  prev.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });
  next.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });
});
// ===== Scroll-to-top button =====
const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
