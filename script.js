const people = {
  bride: {
    title: 'Жинка',
    src: 'assets/bride-photo.svg',
    alt: 'Фото жинки',
    caption: 'Нажали на жинку — вот она, главная красотка праздника.'
  },
  groom: {
    title: 'Муженёчек',
    src: 'assets/groom-photo.svg',
    alt: 'Фото муженёчка',
    caption: 'Нажали на муженёчка — встречайте виновника торжества.'
  }
};

const drawer = document.querySelector('.photo-drawer');
const backdrop = document.querySelector('.photo-backdrop');
const closeButton = document.querySelector('.photo-drawer__close');
const photo = document.querySelector('.photo-drawer__image');
const title = document.querySelector('.photo-drawer__title');
const caption = document.querySelector('.photo-drawer__caption');
const nameButtons = document.querySelectorAll('.name-card');

function openDrawer(personKey) {
  const person = people[personKey];

  if (!person) return;

  photo.src = person.src;
  photo.alt = person.alt;
  title.textContent = person.title;
  caption.textContent = person.caption;

  drawer.classList.remove('is-open', 'photo-drawer--left', 'photo-drawer--right');
  drawer.classList.add(`photo-drawer--${personKey === 'bride' ? 'left' : 'right'}`);
  drawer.setAttribute('aria-hidden', 'false');
  backdrop.hidden = false;
  document.body.classList.add('drawer-open');

  requestAnimationFrame(() => {
    drawer.classList.add('is-open');
  });

  nameButtons.forEach((button) => {
    button.setAttribute('aria-expanded', String(button.dataset.person === personKey));
  });
}

function closeDrawer() {
  drawer.classList.remove('is-open');
  drawer.classList.remove('photo-drawer--left', 'photo-drawer--right');
  drawer.setAttribute('aria-hidden', 'true');
  backdrop.hidden = true;
  document.body.classList.remove('drawer-open');

  nameButtons.forEach((button) => button.setAttribute('aria-expanded', 'false'));
}

nameButtons.forEach((button) => {
  button.addEventListener('click', () => openDrawer(button.dataset.person));
});

closeButton.addEventListener('click', closeDrawer);
backdrop.addEventListener('click', closeDrawer);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDrawer();
});
