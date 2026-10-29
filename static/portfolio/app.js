const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav?.addEventListener('click', event => {
  if (event.target.closest('a')) {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});

const viewer = document.querySelector('#image-viewer');
const viewerImage = document.querySelector('#viewer-image');
const caption = document.querySelector('#viewer-caption');
document.querySelectorAll('.zoom-shot').forEach(button => {
  button.addEventListener('click', () => {
    viewerImage.src = button.dataset.full;
    viewerImage.alt = button.dataset.caption;
    caption.textContent = button.dataset.caption;
    viewer.showModal();
    document.body.classList.add('viewer-open');
  });
});
document.querySelector('#close-viewer')?.addEventListener('click', () => viewer.close());
viewer?.addEventListener('click', event => {
  if (event.target === viewer) {
    const box = viewer.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) viewer.close();
  }
});
viewer?.addEventListener('close', () => document.body.classList.remove('viewer-open'));

const filter = document.querySelector('#project-language');
const rows = [...document.querySelectorAll('.archive-row')];
function updateProjects() {
  let visible = 0;
  rows.forEach(row => {
    row.hidden = filter.value !== 'all' && row.dataset.language !== filter.value;
    if (!row.hidden) visible++;
  });
  const isEnglish = document.documentElement.lang === 'en';
  document.querySelector('#project-count').textContent = `${visible} ${isEnglish ? 'projects' : 'proyectos'}`;
}
filter?.addEventListener('change', updateProjects);
if (filter) updateProjects();

// Reading progress in the desktop navigation, without motion or scroll listeners.
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('#navigation a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-15% 0px -55% 0px' });
  links.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
}

// Use the Hugo-generated language URLs, keeping the current CV section.
document.querySelector('#site-language')?.addEventListener('change', event => {
  window.location.assign(event.target.value + window.location.hash);
});
