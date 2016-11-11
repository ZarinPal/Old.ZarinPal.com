define(['jquery'], function($){
    if(typeof($('.list--item.on'))){
        $('.list--item.on').children('p').slideDown();
    }

    $('.list--item header').bind('click', function(){
        if($(this).parent().hasClass('on')){
            $(this).parent().removeClass('on').addClass('off');
            $(this).parent().children('p').slideUp();
        }
        else{
            $('.list--item').removeClass('on');
            $('.list--item p').slideUp();
            $(this).parent().removeClass('off').addClass('on');
            $(this).parent().children('p').slideDown();
        }
    });
});
