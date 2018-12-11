
/*
Reference: http://jsfiddle.net/BB3JK/47/
*/

$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

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

var randomQuoteData;
var quoteElement = document.getElementById('--js-random-quote');
var authorElement = document.getElementById('--js-random-quote-author');

function getJSONData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     randomQuoteData = JSON.parse(xhttp.response);
    }
  };
  xhttp.open("GET", 'assets/json/quote.json', true);
  xhttp.send();
}

function getRandomQuote() {
  var randomNumber = Math.floor(Math.random() * randomQuoteData[0].quotes.length);
  var quote = randomQuoteData[0].quotes[randomNumber].quote;
  var author = randomQuoteData[0].quotes[randomNumber].author;

  quoteElement.innerHTML = quote;
  authorElement.innerHTML = '- ' + author;
}

window.onload = function() {
  getJSONData();
  setTimeout(getRandomQuote, 50);
}