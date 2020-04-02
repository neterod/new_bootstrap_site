(function ($) {
    'use strict';

    function parallaxInit () {
        var $parallax = $('.parallax'),
            speed = 0.2;

        function parallaxScroll () {
            if (!window.isMobile) {
                [].slice.call($parallax).forEach(function (el) {
                    var windowYOffset = window.pageYOffset - el.offsetTop - 50,
                        elBackgrounPos = 'center ' + (windowYOffset * speed) + 'px';

                    el.style.backgroundPosition = elBackgrounPos;
                });
            } else {
                [].slice.call($parallax).forEach(function (el) {
                    el.style.backgroundPosition = 'center 0';
                });
            }
        }

        window.onscroll = function () {
            parallaxScroll();
        };

        parallaxScroll();
    }

    window.parallaxInit = parallaxInit;
}(jQuery));
