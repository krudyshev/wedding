const people = {
  bride: {
    src: 'assets/bride-photo.svg',
    alt: 'Фото жинки'
  },
  groom: {
    src: 'assets/groom-photo.svg',
    alt: 'Фото муженёчка'
  }
};

const drawer = document.querySelector('.photo-drawer');
const backdrop = document.querySelector('.photo-backdrop');
const closeButton = document.querySelector('.photo-drawer__close');
const photo = document.querySelector('.photo-drawer__image');
const nameButtons = document.querySelectorAll('.name-card');

function openDrawer(personKey) {
  const person = people[personKey];

  if (!person) return;

  photo.src = person.src;
  photo.alt = person.alt;
  const directionClass = personKey === 'bride' ? 'photo-drawer--from-left' : 'photo-drawer--from-right';

  drawer.classList.remove('is-open', 'photo-drawer--from-left', 'photo-drawer--from-right');
  drawer.classList.add(directionClass);
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
  drawer.classList.remove('is-open');
  drawer.classList.remove('photo-drawer--from-left', 'photo-drawer--from-right');
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
