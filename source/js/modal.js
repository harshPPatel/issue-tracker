var modalOverlay =   document.querySelector('#modalContainer .overlay');
var modalContainer = document.querySelector('#modalContainer');
var modalCloseElement = document.querySelectorAll('.--js-modal-close');
var modalBody = document.querySelector('#modalContainer .modal');
var body = document.body;


function isContainerOpen(){
  if (modalContainer.style.display == 'flex') {
    return true;
  } else {
    return false;
  }
}

function setBodyOverflow() {
  if (isContainerOpen()) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'scroll';
  }
}

function containerFunction() {
  if (isContainerOpen()) {
    modalContainer.style.display = "none";
  } else {
    modalContainer.style.display = "flex";
  }
}

function modalOverlayStyle() {
  if (isContainerOpen()) {
    modalOverlay.animate([
      {
        opacity: '1'
      },
      {
        opacity: '0'
      }
    ], 500);
    modalOverlay.style.opacity = '0';
  } else {
    modalOverlay.animate([
      {
        opacity: '0'
      },
      {
        opacity: '1'
      }
    ], 500);
    modalOverlay.style.opacity = '1';
  }
}

function modalBodyStyle() {
  if (isContainerOpen()) {
    modalBody.animate([
      {
        opacity: '1',
        transform: 'scale(1)'
      },
      {
        opacity: '0',
        transform: 'scale(0.9)'
      }
    ], 200);
    modalBody.style.opacity = '0';
    modalBody.style.transform = 'scale(0.9)';
  } else {
    modalBody.animate([
      {
        opacity: '0',
        transform: 'scale(0.9)'
      },
      {
        opacity: '1',
        transform: 'scale(1)'
      }
    ], {
      delay: 100,
      duration: 200
    });
    modalBody.style.opacity = '1';
    modalBody.style.transform = 'scale(1)';
  }
}

function modal() {
  modalBodyStyle();
  modalOverlayStyle();
  setTimeout(function() {
    containerFunction();
  }, 150);
  setTimeout(function() {
    setBodyOverflow();
  }, 160);
}

modalCloseElement.forEach(function(){
  this.addEventListener('click', function(event) {
    event.preventDefault();
    modal();
  });  
});
  

// Use  : modal()
