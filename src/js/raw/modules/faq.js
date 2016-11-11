'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

define(['jquery'], function ($) {
    if (_typeof($('.list--item.on'))) {
        $('.list--item.on').children('p').slideDown();
    }

    $('.list--item header').bind('click', function () {
        if ($(this).parent().hasClass('on')) {
            $(this).parent().removeClass('on').addClass('off');
            $(this).parent().children('p').slideUp();
        } else {
            $('.list--item').removeClass('on');
            $('.list--item p').slideUp();
            $(this).parent().removeClass('off').addClass('on');
            $(this).parent().children('p').slideDown();
        }
    });
});
//# sourceMappingURL=faq.js.map
