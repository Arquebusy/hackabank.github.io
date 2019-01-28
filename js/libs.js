$(document).ready(function(){
  $(window).scroll(function(){
    if($("#problem").offset().top < $(window).scrollTop())
    $(".fill-scroll").removeClass("block");
    $(".is-ios").removeClass("block");
  });
});​

$(function() {
  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
    },
    submitSuccess: function($form, event) {
      event.preventDefault();
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name;
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true);
      $.ajax({
        url: "./mail/mail.php",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message
        },
        cache: false,
        success: function() {
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append("</button>");
          $('#success > .alert-success')
          .append("<strong>Message envoyé ! </strong>");
          $('#success > .alert-success')
          .append('</div>');
          $('#contactForm').trigger("reset");
        },
        error: function() {
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Désole " + firstName + ", il semble que le serveur de messagerie ne répond pas. Veuillez réessayer plus tard !"));
          $('#success > .alert-danger').append('</div>');
          $('#contactForm').trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false);
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});
$('#name').focus(function() {
  $('#success').html('');
});

$(document).ready(function () {
  $('#newsletter').submit(function () {
    var $this     = $(this),
    $response = $('#response'),
    $mail     = $('#signup-email'),
    testmail  = /^[^0-9][A-z0-9._%+-]+([.][A-z0-9_]+)*[@][A-z0-9_]+([.][A-z0-9_]+)*[.][A-z]{2,4}$/,
    hasError  = false;

    $response.find('p').remove();

    if (!testmail.test($mail.val())) {
      $response.html('<p class="error">Please enter a valid email</p>');
      hasError = true;
    }

    if (hasError === false) {

      $response.find('p').remove();
      $response.addClass('loading');

      $.ajax({
        type: "POST",
        dataType: 'json',
        cache: false,
        url: $this.attr('action'),
        data: $this.serialize()
      }).done(function (data) {
        $response.removeClass('loading');
        $response.html('<p>'+data.message+'</p>');
      }).fail(function() {
        $response.removeClass('loading');
        $response.html('<p>An error occurred, please try again</p>');
      })
    }


    return false;
  });
});

$('#overlay').hide();
function overlayOn() {
  $('#overlay').fadeIn(500);
}

function overlayOff() {
  $("#overlay").fadeOut(500);
}

$(document).keydown(function(e) {
  if (e.keyCode === 27) {
    $("#overlay").fadeOut(500);
  };
});

$('a[href^="#"]').on('click', function(event) {
  var target = $(this.getAttribute('href'));
  if( target.length ) {
    event.preventDefault();
    $('html, body').stop().animate({
      scrollTop: target.offset().top
    }, 1000);
    overlayOff();
  }
});

const st = {};
st.flap = document.querySelector('#flap');
st.toggle = document.querySelector('.toggle');
st.choice1 = document.querySelector('#choice1');
st.choice2 = document.querySelector('#choice2');
st.flap.addEventListener('transitionend', () => {
    if (st.choice1.checked) {
        st.toggle.style.transform = 'rotateY(-15deg)';
        setTimeout(() => st.toggle.style.transform = '', 400);
    } else {
        st.toggle.style.transform = 'rotateY(15deg)';
        setTimeout(() => st.toggle.style.transform = '', 400);
    }
})

st.clickHandler = (e) => {
    if (e.target.tagName === 'LABEL') {
        setTimeout(() => {
            st.flap.children[0].textContent = e.target.textContent;
        }, 250);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    st.flap.children[0].textContent = st.choice2.nextElementSibling.textContent;
});
document.addEventListener('click', (e) => st.clickHandler(e));
