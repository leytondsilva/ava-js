(function($) {
    'use strict';
    $(window).on('load', function() {
        $('.loader').fadeOut(1000);
        var wow = new WOW({
            offset: 150,
            mobile: false
        });
        wow.init();
    });
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1000,
        outDuration: 700,
        linkElement: 'a.project-box',
        loading: true,
        loadingParentElement: 'body',
        loadingClass: 'spinner',
        loadingInner: '<div class="double-bounce1"></div><div class="double-bounce2"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'body',
        transition: function(url) {
            window.location.href = url;
        }
    });
    $('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-with-zoom',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
    $('.navbar-toggle').on('click', function() {
        $('body').removeClass('menu-is-closed').addClass('menu-is-opened');
    });
    $('.close-menu, .click-capture, .menu-list li a').on('click', function() {
        $('body').removeClass('menu-is-opened').addClass('menu-is-closed');
        $('.menu-list ul').slideUp(300);
    });    
    $('.col-resume').on('mouseover', function() {
        $('.section-bg.mask').addClass('hide');
    });
    $('.col-resume').on('mouseleave', function() {
        $('.section-bg.mask').removeClass('hide');
    });
    if ($('.owl-carousel').length > 0) {
        $(".review-carousel").owlCarousel({
            responsive: {
                0: {
                    items: 1
                },
                720: {
                    items: 1,
                },
                1280: {
                    items: 1
                }
            },
            responsiveRefreshRate: 0,
            nav: false,
            navText: [],
            dots: true
        });
    }
    function menulist() {
        var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $('.menu-list li').removeClass('active');
        $('.menu-list li a').each(function() {
            if (this.href === path) {
                $(this).closest('li').addClass('active');
            }
        });
    }
    function navbarFullpage() {
        if ($('.pp-section.active').scrollTop() > 0) {
            $('.navbar-fullpage').addClass('navbar-fixed');
        } else {
            $('.navbar-fullpage').removeClass('navbar-fixed');
        }
    }
    navbarFullpage();
    function navbar() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 0) {
                $('.navbar').addClass('navbar-fixed');
            } else {
                $('.navbar').removeClass('navbar-fixed');
            }
        });
    }
    navbar();
    if ($('.pagepiling').length > 0) {
        $('.pagepiling').pagepiling({
            scrollingSpeed: 280,
            loopBottom: true,
            anchors: ['Home', 'AboutMe', 'Resume', 'Projects', 'WebApps', 'Contact'],
            afterLoad: function(anchorLink, index) {
                navbarFullpage();
                menulist();
            }
        });
    }
    $('.pp-scrollable').on('scroll', function() {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > 0) {
            $('.navbar-fullpage').addClass('navbar-fixed');
        } else {
            $('.navbar-fullpage').removeClass('navbar-fixed');
        }
    });
    $('#pp-nav').remove().appendTo('.animsition').addClass('white right-boxed hidden-xs');
    $('.pp-nav-up').on('click', function() {
        $.fn.pagepiling.moveSectionUp();
    });
    $('.pp-nav-down').on('click', function() {
        $.fn.pagepiling.moveSectionDown();
    });
    $('.project-row a').on('mouseover', function() {
        var index = $('.project-row a').index(this)
        $('.project-row a').removeClass('active');
        $(this).addClass('active');
        $('.bg-changer .section-bg').removeClass('active').eq(index).addClass('active');
    });
    /*touch screen mouseover to click project-section*/
    $('a.taphover').on('touchstart', function(e) {
        'use strict'; //satisfy code inspectors
        var index = $('.project-row a').index(this)
        var link = $(this); //preselect the link
        if (link.hasClass('active')) {
            return true;
        } else {
            link.addClass('active');
            $('a.taphover').not(this).removeClass('active');
            e.preventDefault();
            $('.bg-changer .section-bg').removeClass('active').eq(index).addClass('active');
            return false; //extra, and to make sure the function has consistent return points
        }
    });
    if ($('.js-form').length) {
        $('.js-form').each(function() {
            $(this).validate({
                errorClass: 'error',
                submitHandler: function(form) {
                    $.ajax({
                        type: "POST",
                        url: "mail.php",
                        data: $(form).serialize(),
                        success: function() {
                            $('.form-group-message').show();
                            $('#error').hide();
                            $('#success').show();
                        },
                        error: function() {
                            $('.form-group-message').show();
                            $('#success').hide();
                            $('#error').show();
                        }
                    });
                }
            });
        });
    }
}
)(jQuery);
