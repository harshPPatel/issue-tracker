const modalOverlay = document.querySelector('#modalContainer .overlay');
const modalContainer = document.querySelector('#modalContainer');
const modalCloseElement = document.querySelectorAll('.--js-modal-close');
const modalBody = document.querySelector('#modalContainer .modal');

/**
 * @function isModalContainerOpen
 * @description Returns true if the modal container is open. Otherwise it returns false.
 * @returns {Boolean} True if modal container is open. False otherwise.
 */
const isModalContainerOpen = () => {
  if (modalContainer.style.display === 'flex') {
    return true;
  } else {
    return false;
  }
};

/**
 * @function setBodyOverflow
 * @description Changes the Body's overflow property. If the modal container is open,
 * it adds 'noscroll' class to the body which will set overflow to 'hidden' otehrwise
 * it sets it to 'scroll'.
 */
const setBodyOverflow = () => {
  if (isModalContainerOpen()) {
    document.body.classList.add('noscroll');
  } else {
    document.body.classList.remove('noscroll');
  }
};

const toggleContainer = () => {
  if (isModalContainerOpen()) {
    modalContainer.style.display = 'none';
  } else {
    modalContainer.style.display = 'flex';
  }
};

const toggleModalOverlay = () => {
  if (isModalContainerOpen()) {
    modalOverlay.animate(
      [
        {
          opacity: '1',
        },
        {
          opacity: '0',
        },
      ],
      500,
    );
    modalOverlay.style.opacity = '0';
  } else {
    modalOverlay.animate(
      [
        {
          opacity: '0',
        },
        {
          opacity: '1',
        },
      ],
      500,
    );
    modalOverlay.style.opacity = '1';
  }
};

const toggleModalBody = () => {
  if (isModalContainerOpen()) {
    modalBody.animate(
      [
        {
          opacity: '1',
          transform: 'scale(1)',
        },
        {
          opacity: '0',
          transform: 'scale(0.9)',
        },
      ],
      200,
    );
    modalBody.style.opacity = '0';
    modalBody.style.transform = 'scale(0.9)';
  } else {
    modalBody.animate(
      [
        {
          opacity: '0',
          transform: 'scale(0.9)',
        },
        {
          opacity: '1',
          transform: 'scale(1)',
        },
      ],
      {
        delay: 100,
        duration: 200,
      },
    );
    modalBody.style.opacity = '1';
    modalBody.style.transform = 'scale(1)';
  }
};

const modal = () => {
  toggleModalBody();
  toggleModalOverlay();
  setTimeout(() => {
    toggleContainer();
  }, 150);
  setTimeout(() => {
    setBodyOverflow();
  }, 160);
};

modalCloseElement.forEach(element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    modal();
  });
});

export default modal;
