// For Header
$(function () {
    window.scrollTo(0, 0);
    //Select dropdown values
    $(".dropdown-menu li a").click(function () {
        var selText = $(this).text();
        $(this).parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
    });

    // Scroll top
    $("#toTop").scrollToTop(1000);
});

// For Scroll top
(function ($) {
    $.fn.scrollToTop = function (options) {
        var config = {
            "speed": 800
        };

        if (options) {
            $.extend(config, {
                "speed": options
            });
        }

        return this.each(function () {

            var $this = $(this);

            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $this.fadeIn();
                } else {
                    $this.fadeOut();
                }
            });

            $this.click(function (e) {
                e.preventDefault();
                $("body, html").animate({
                    scrollTop: 0
                }, config.speed);
            });

        });
    };
})(jQuery);

//on Click scroll
$('.smoothScroll').click(function () {
    $('html, body').animate({ scrollTop: $($.attr(this, 'href')).offset().top - 120 }, 500);
    return false;
});


//--Read more
$(document).ready(function () {
    // Configure/customize these variables.
    var showChar = 630;  // How many characters are shown by default    
    var moretext = "READ MORE";
    var lesstext = "READ LESS";


    $('.readmore').each(function () {
        var content = $(this).html();

        if (content.length > showChar) {
            var html = content;

            $(this).html(html).parent().append('<a href="" class="morelink">' + moretext + '</a>');
        }

    });

    $(".morelink").click(function () {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);            
            $(this).prev().removeClass('in');            
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);            
            $(this).prev().addClass('in');
        }
      
        //$(this).parent().prev().toggle();
        //$(this).prev().toggle();
        return false;
    });
});