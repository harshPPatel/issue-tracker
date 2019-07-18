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
  // Checking Modal container's display property
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
  // Checking if the modal container is open or not
  if (isModalContainerOpen()) {
    // Adding 'noscroll' class to body
    document.body.classList.add('noscroll');
  } else {
    // Removing 'noscroll' class to body
    document.body.classList.remove('noscroll');
  }
};

/**
 * @function toggleContainer
 * @description Checks if the container is open and changes container style.
 * If the container is open, it change its display style to none, and
 * if the container is closed, then changes display style to flex.
 */
const toggleContainer = () => {
  // Checking  if the container is open or not.
  if (isModalContainerOpen()) {
    modalContainer.style.display = 'none';
  } else {
    modalContainer.style.display = 'flex';
  }
};

/**
 * @function toggleModalOverlay
 * @description Checks if the modal container is open or not. Then shows the modal's
 * overlay with animation.
 */
const toggleModalOverlay = () => {
  // Checking if the container is open or not
  if (isModalContainerOpen()) {
    // Closing modalOverlay with animation
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
    // showing modal overlay with animation
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

/**
 * @function toggleModalBody
 * @description Checks if the container is open and changes modal body style.
 * If the container is close, it closes the modal from the screen with animation.
 * If the container is open, then it shows the modal to the screen with animation.
 */
const toggleModalBody = () => {
  // Checking if the container is open or not
  if (isModalContainerOpen()) {
    // Removing modal body with animation
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
    // Showing modal body with animation
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

/**
 * @function modal
 * @description Calls all modal related functions step by step.
 */
const modal = () => {
  // Toggling modal body
  toggleModalBody();

  // Toggling modal overlay
  toggleModalOverlay();

  // Toggling the container
  setTimeout(() => {
    toggleContainer();
  }, 150);

  // Setting body overflow
  setTimeout(() => {
    setBodyOverflow();
  }, 160);
};

// Adding click event listeners to all modalCloseElements.
modalCloseElement.forEach(element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    modal();
  });
});

// Exporting modal as default
export default modal;
