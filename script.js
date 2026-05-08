const people = {
  bride: {
    src: 'assets/bride.png',
    fallbackSrc: 'assets/bride-photo.svg',
    alt: 'Фото жинки',
    caption: 'главная красавица свадьбы'
  },
  groom: {
    src: 'assets/groom.png',
    fallbackSrc: 'assets/groom-photo.svg',
    alt: 'Фото муженёчка',
    caption: 'главный виновник торжества'
  }
};

const drawer = document.querySelector('.photo-drawer');
const backdrop = document.querySelector('.photo-backdrop');
const closeButton = document.querySelector('.photo-drawer__close');
const photo = document.querySelector('.photo-drawer__image');
const photoCaption = document.querySelector('.photo-drawer__caption');
const confettiTrigger = document.querySelector('.confetti-trigger');
const nameButtons = document.querySelectorAll('.name-card');


function preloadPeoplePhotos() {
  Object.values(people).forEach((person) => {
    const image = new Image();

    image.src = person.src;
  });
}

function setPhoto(person) {
  photo.dataset.fallbackSrc = person.fallbackSrc;
  photo.dataset.fallbackApplied = 'false';
  photo.src = person.src;
  photo.alt = person.alt;
  photoCaption.textContent = person.caption;
}

function openDrawer(personKey) {
  const person = people[personKey];

  if (!person || !drawer || !backdrop || !photo || !photoCaption) return;

  setPhoto(person);
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  backdrop.hidden = false;
  document.body.classList.add('drawer-open');

  void drawer.offsetWidth;
  drawer.classList.add('is-open');

  nameButtons.forEach((button) => {
    button.setAttribute('aria-expanded', String(button.dataset.person === personKey));
  });
}

function closeDrawer() {
  if (!drawer || !backdrop) return;

  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  backdrop.hidden = true;
  document.body.classList.remove('drawer-open');

  nameButtons.forEach((button) => button.setAttribute('aria-expanded', 'false'));
}

function applyPhotoFallback() {
  const fallbackSrc = photo.dataset.fallbackSrc;

  if (!fallbackSrc || photo.dataset.fallbackApplied === 'true') return;

  photo.dataset.fallbackApplied = 'true';
  photo.src = fallbackSrc;
}

nameButtons.forEach((button) => {
  button.addEventListener('click', () => openDrawer(button.dataset.person));
});

closeButton?.addEventListener('click', closeDrawer);
backdrop?.addEventListener('click', closeDrawer);
photo?.addEventListener('error', applyPhotoFallback);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDrawer();
});

function launchConfetti() {
  const colors = ['#f8a8c7', '#ffd8a8', '#fff1a8', '#bdebd0', '#abd7f2', '#d8c7ff'];
  const shapes = ['circle', 'petal', 'ribbon'];

  for (let index = 0; index < 76; index += 1) {
    const piece = document.createElement('span');
    const startX = Math.random() * 100;
    const drift = (Math.random() - 0.5) * 46;
    const duration = 2.8 + Math.random() * 2.4;
    const delay = Math.random() * 0.45;
    const size = 8 + Math.random() * 11;

    piece.className = `confetti-piece confetti-piece--${shapes[index % shapes.length]}`;
    piece.style.setProperty('--confetti-color', colors[index % colors.length]);
    piece.style.setProperty('--start-x', `${startX}vw`);
    piece.style.setProperty('--drift', `${drift}vw`);
    piece.style.setProperty('--fall-duration', `${duration}s`);
    piece.style.setProperty('--fall-delay', `${delay}s`);
    piece.style.setProperty('--piece-size', `${size}px`);
    piece.style.setProperty('--spin', `${Math.random() > 0.5 ? '' : '-'}${360 + Math.random() * 540}deg`);

    document.body.append(piece);
    piece.addEventListener('animationend', () => piece.remove(), { once: true });
  }
}

preloadPeoplePhotos();

confettiTrigger?.addEventListener('click', launchConfetti);
