(function () {
  'use strict';

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  var printBtn = document.querySelector('.print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }

  var sections = document.querySelectorAll('.section, .hero');
  var navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

  function updateActiveNav() {
    var scrollY = window.pageYOffset;
    var nav = document.querySelector('.nav');
    var navHeight = nav ? nav.offsetHeight : 0;
    var threshold = 100;

    sections.forEach(function (section) {
      var id = section.getAttribute('id');
      if (!id) return;
      var top = section.offsetTop - navHeight - threshold;
      var height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  if (navLinks.length && sections.length) {
    window.addEventListener('scroll', function () {
      requestAnimationFrame(updateActiveNav);
    });
    updateActiveNav();
  }
})();