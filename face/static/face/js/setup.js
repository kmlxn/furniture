//Setup flex slider
$(window).load(function () {
    $('.gf-slider').flexslider();
});
//Setup Page
$(document).ready(function () {
    //Initialize PrettyPhoto here
    //$("a[rel^='prettyPhoto']").prettyPhoto({ animation_speed: 'normal', theme: 'facebook', slideshow: 3000, autoplay_slideshow: false, social_tools: false 	});

	//Remove this line if you want to naviagate to url on each client box click
	$('#clients.grid a').click(function(){return false;});

    /* smooth-scroll */
    $("ul#navigation a").smoothScroll({
        afterScroll: function () {
            $('ul#navigation a.active').removeClass('active');
            $(this).addClass('active');
        }
    });

    //Scroll
    $('div.page').waypoint(function () {
        var id = $(this).attr('id');

        $('ul#navigation a.active').removeClass('active');
        $('ul#navigation a[href="#' + id + '"]').addClass('active');
    });

    /* fixes */
    $(window).scroll(function () {
        if ($(window).scrollTop() === 0) {
            $('ul#navigation a.active').removeClass('active');
            $('ul#navigation a[href="#home"]').addClass('active');
        } else if ($(window).height() + $(window).scrollTop() === $('#container').height()) {
            $('ul#navigation a.active').removeClass('active');
            $('ul#navigation a[href^="#"]:last').addClass('active');
        }
    });

    /* tab */
    // first selector
    $('.tab').each(function () {
        $(this).find('ul > li:first').addClass('active');
        $(this).find('div.tab_container > div:first').addClass('active');
    });

    /* toggles */
    $('.toggle h3').click(function () {
        $(this).parent().find('.toggle_data').slideToggle();
    });

    // click functions
    $('.tab > ul > li').click(function () {
        $(this).parent().find('li.active').removeClass('active');
        $(this).addClass('active');

        $(this).parent().parent().find('div.tab_container > div.active').removeClass('active').slideUp();
        $(this).parent().parent().find('div.tab_container > div#' + $(this).attr('id')).slideDown().addClass('active');

        return false;
    });

    // var $container = $('div#works').isotope({
    //     itemSelector: 'img.work',
    //     layoutMode: 'fitRows'
    // });

    // items filter
    $('#works_filter a').click(function () {
        var selector = $(this).attr('data-filter');
        var boxes = $(".box");
        $(".no-touch").animate({opacity: '0'}, 300, 'linear', function () {
            boxes.show();
            boxes.not(selector).hide();
            $(".no-touch").animate({opacity: '1'}, 300, 'linear');
        });

        $('#works_filter').find('a.selected').removeClass('selected');
        $(this).addClass('selected');

        return false;
    });

    //smooth scroll top
    $('.gotop').addClass('hidden');

    $("a.gotop").smoothScroll();

    $('#wrap').waypoint(function (event, direction) {
        $('.gotop').toggleClass('hidden', direction === "up");
    }, {
        offset: '-100%'
    });
    //bind send message here
    $('#submit').click(sendMessage);

    // magnific-popup
    $('.open-popup-link').magnificPopup({
        type:'image',
        gallery: {
            enabled: true
        },
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
});


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

var preventDefault = function (e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
};

var preventDefaultForScrollKeys = function (e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
};

var disableScroll = function () {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
};

var enableScroll = function () {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
};



/* Contact Form */
function checkEmail(email) {
    var check = /^[\w\.\+-]{1,}\@([\da-zA-Z-]{1,}\.){1,}[\da-zA-Z-]{2,6}$/;
    if (!check.test(email)) {
        return false;
    }
    return true;
}

function sendMessage() {
    // receive the provided data
    var name = $("input#name").val();
    var email = $("input#email").val();
    var subject = $("input#subject").val();
    var msg = $("textarea#msg").val();

    // check if all the fields are filled
    if (name == '' || name == 'Full Name*' || email == '' || email == 'Email Address*' || subject == '' || subject == 'Subject*' || msg == '' || msg == 'Your Message*') {
        $("div#msgs").html('<p class="warning">You must enter all the fields!</p>');

        return false;
    }

    // verify the email address
    if (!checkEmail(email)) {
        $("div#msgs").html('<p class="warning">Please enter a valid Email Address</p>');
        return false;
    }

    // make the AJAX request
    var dataString = $('#cform').serialize();
    $.ajax({
        type: "POST",
        url: 'contact.php',
        data: dataString,
        dataType: 'json',
        success: function (data) {
            if (data.success == 0) {
                var errors = '<ul><li>';
                if (data.name_msg != '')
                    errors += data.name_msg + '</li>';
                if (data.email_msg != '')
                    errors += '<li>' + data.email_msg + '</li>';
                if (data.message_msg != '')
                    errors += '<li>' + data.message_msg + '</li>';
                if (data.subject_msg != '')
                    errors += '<li>' + data.subject_msg + '</li>';

                $("div#msgs").html('<p class="error">Could not complete your request. See the errors below!</p>' + errors);
            }
            else if (data.success == 1) {

                $("div#msgs").html('<p class="error">You message has been sent successfully!</p>');
            }

        },
        error: function () {
            $("div#msgs").html('<p class="error">Could not complete your request. Sorry!</p>');
        }
    });

    return false;
}
