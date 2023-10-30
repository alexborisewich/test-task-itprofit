const modal = document.querySelector('.modal') as HTMLDivElement;

const scrollbarWidth = window.innerWidth - document.body.clientWidth + 'px';

const showModal = () => {
  document.body.style.marginRight = scrollbarWidth;
  document.body.style.overflow = 'hidden';
  modal.classList.add('modal--open');
};

const hideModal = () => {
  modal.classList.remove('modal--open');
  setTimeout(() => {
    document.body.style.overflow = 'visible';
    document.body.style.marginRight = '0px';
  }, 200);
};

export function controlModal() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('modal-control__btn')) showModal();
    if (target.classList.contains('modal--open') || target.className === 'modal__close-btn') {
      hideModal();
    }
  });
}
