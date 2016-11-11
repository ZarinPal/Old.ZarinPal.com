define(['jquery', 'bowser'], function($, bowser){
    $(document).ready(function() {

        const browser = $.browser;

        const shade = () => {
            return $('.global--header').addClass('shade-gradient');
        };


		if (browser.msie && browser.versionNumber < 10) {
			var el = document.createElement('a');
			$(el).addClass('version').attr('href', 'http://browsehappy.com/').appendTo('body');
		}
        if(browser.msie || browser.webkit || browser.mozilla || browser.msedge){
            if (browser.msie) {
                shade();
                $('.hero--logo .hero--logo_icon').remove();
            }
            if (browser.webkit && browser.versionNumber <= 40) {
    			shade();
            }
    		if (browser.msedge){
    			shade();
    		}
        }

        $(function () {

            // Matrix Design "Vector"
            let Header     = $('.global--header'),
                Footer     = $('.global--footer'),
                GlobSticky = $('.global--sticky'),
                HeaderNav  = $('[data-sticky]');

            // let dg, bg, ndg;
            const props       = $('[data-props]'),
                  tablet      = 48.25 * 16,
                  aspectRatio = ($(window).width() / $(window).height()).toFixed(5);


            let prefix = () => {
                let styles = window.getComputedStyle(document.documentElement, ''),
                       pre = (Array.prototype.slice
                              .call(styles)
                              .join('')
                              .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1],
                       dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];

                return {
                    dom: dom,
                    lowercase: pre,
                    css: '-' + pre + '-',
                    js: pre[0].toUpperCase() + pre.substr(1)
                };
            };


            // TODO: Fixed Transfrom data-vector in Mobile and Desktop
            // $(document).on('scroll', function(){
            //
            //     let scrtop = $(window).scrollTop(),
            //         val    = 5;
            //
            //     let bscrtop = scrtop / -val;
            //     // $('[data-promo]').css("-webkit-transform", "matrix(1, 0, 0, 1, " + bscrtop / 10 + ", " + bscrtop + ")");
            //     $('[data-vector]').css(prefix().js+"Transform", "translateY( " + bscrtop + "px)");
            // });


            let isUnicode = (str) => {
            	let letters = [];
            	for (let i = 0; i <= str.length; i++) {
            		letters[i] = str.substring((i - 1), i);
            		if (letters[i].charCodeAt() > 255) { return true; }
            	}
            	return false;
            };

            let dir = $('[data-input]');
            dir.on('keyup paste', function() {
                let data = dir.data('input');

            	if ($(this).val() === null || isUnicode($(this).val())) {
            		$(this).css('direction', 'rtl');
                    if(data.type == "labs"){
                        $(this).parent('form').removeClass('rtl ltr').addClass('rtl');
                    }
            	}
            	else {
            		$(this).css('direction', 'ltr');
                    if(data.type == "labs"){
                        $(this).parent('form').removeClass('rtl ltr').addClass('ltr');
                    }
            	}
            });


            let stickyNav = function() {
                let stickyNavTop = Header.offset().top + Header.height(),
                    FooterTop    = Footer.offset().top - ( GlobSticky.height() + GlobSticky.height() / 3 ),
                    scrollTop    = $(window).scrollTop();

                    stickyNavTop = ( stickyNavTop > 500 ) ? stickyNavTop : 300;

                HeaderNav.each(function(i){
                    let HeaderNavAttr = $(this).data('sticky');
                    if ( typeof HeaderNavAttr !== typeof undefined && HeaderNavAttr !== false ){

                        if ( scrollTop >= stickyNavTop && scrollTop <= FooterTop) {
                            $(this).addClass('is-sticky');
                        } else {
                            $(this).removeClass('is-sticky');
                        }
                    }

                });
            };

            $(window).on('scroll resize', function() {
                stickyNav();
            });



            if ('ontouchstart' in window === false) {
                if(props.length > 0){

                    let data = props.data('props'),
                        start_prop = data.start,
                        end_prop = data.end;

                    // console.log("data:", data);

                    $(document).mousemove(function(e) {
                        let w = $(document).width(),
                            // dg = 180 * (+e.pageX) / (w - (w * .25)) / 5,
                            dg = e.pageX + e.pageY,
                            ndg = (120 * dg) / w / 2,
                            bg = "linear-gradient(" + ndg + "deg, " + end_prop + ", " + start_prop + " )";


                        // bg = "linear-gradient(" + dg + "deg, " + end_prop + ", " + start_prop + " )";

                        // bg = "linear-gradient(" + dg * 2.5 + "deg, " + start_prop + " 0%, " + end_prop + " 10.5rem), linear-gradient("+ (dg * 5) +"deg, " + start_prop + " 0%, " + middle_prop + " 40%, " + end_prop + " 80%, " + end_prop + " 100%)";
                        // bg = "linear-gradient(" + dg * 2.5 + "deg, #69c 0%, rgba(102,153,204, 0) " + dg + "rem), linear-gradient(" + dg * 5 + "deg, " + start_prop + " 0%, " + middle_prop + " 50%, " + end_prop + " 79%, " + start_prop + " 100%)";
                        // bg = "linear-gradient(" + -dg + "deg, #69c 0%, rgba(102,153,204,0) " + dg + "rem), linear-gradient(" + dg * 2 + "deg, " + start_prop + " 0%, " + middle_prop + " " + dg / 2 + "%, " + end_prop + " " + dg / 10 + "%, rgba(50,149,148, .75) " + dg + "%)";
                        if(data.gradient === true) { $("[data-props]").css("background-image", bg); }
                    });
                }
            }



            $('a[href^="#"]').click(function(){
				if ($(this).hasClass('page-link')) {
					return false;
				} else {
	                let element = $(this).attr('href'),
	                    outside = $(this).data('path'),
	                    offset  = $(element).offset().top;
	                    offset  = (outside === true) ? offset - HeaderNav.height() : offset;

	                $('html, body').animate({scrollTop: offset}, 1000);
				}
				return false;
            });


            (function($){
                $.fn.extend({
                    getFullPath: function(stopAtBody){
                        stopAtBody = stopAtBody || false;
                        function traverseUp(el){
                            var result = el.tagName + ':eq(' + $(el).index() + ')',
                                pare = $(el).parent()[0];
                            if (pare.tagName !== undefined && (!stopAtBody || pare.tagName !== 'BODY')){
                                result = [traverseUp(pare), result].join(' ');
                            }
                            return result;
                        }
                        return this.length > 0 ? traverseUp(this[0]) : '';
                    }
                });
            })(jQuery);


            let PrimaryContent = $('.primary-step_content');

            let ReverseGrid = () => {


                let win = $(window);
                // if( win.width() < tablet ){

                    PrimaryContent.find('img').parents("div[class^='column__']").each(function(){
                        if($(this).index() === 1){

                            let self = $(this);
                            let clone = $(this).clone();

                            if ( win.width() < tablet ){
                                clone.prependTo($(this).parent());
                                self.remove();
                            }
                            // if ( win.width() !> tablet ){

                            //     clone.appendTo($(this).parent());
                            //     self.remove();
                            // }
                        }
                    });

                // }

            };

            if( typeof(PrimaryContent) && PrimaryContent.length > 0 ){
                $(window).on('load resize', function(){
                    ReverseGrid();
                });
            }
        });
    });



    // $('.arrow-next').click(function() {
    //   var currentSlide = $('.active-slide'),
    //       nextSlide = currentSlide.next(),
    //       currentDot = $('.active-dot'),
    //       nextDot = currentDot.next();
    //
    //   if (nextSlide.length === 0) {
    //     nextSlide = $('.slide').first();
    //     nextDot = $('.dot').first();
    //   }
    //
    //   currentSlide.fadeOut(600).removeClass('active-slide');
    //   nextSlide.fadeIn(600).addClass('active-slide');
    //
    //   currentDot.removeClass('active-dot');
    //   nextDot.addClass('active-dot');
    // });
    //
    // $('.arrow-prev').click(function() {
    //   var currentSlide = $('.active-slide'),
    //     prevSlide = currentSlide.prev(),
    //     currentDot = $('.active-dot'),
    //     prevDot = currentDot.prev();
    //
    //   if (prevSlide.length === 0) {
    //     prevSlide = $('.slide').last();
    //     prevDot = $('.dot').last();
    //   }
    //
    //   currentSlide.fadeOut(600).removeClass('active-slide');
    //   prevSlide.fadeIn(600).addClass('active-slide');
    //
    //   currentDot.removeClass('active-dot');
    //   prevDot.addClass('active-dot');
    // });
    //
    //
    // // $('.global--header__promocases-item').each(function() {
    // // 	$('.slider-dots').append('<li class="dot">&bull;</li>');
    // // });
    //
    // $('.global--header__promocases-item:first').addClass('active-slide');
    // $('.slider-dots li:first').addClass('active-dot');


    /**
     * Menu UL-SPAN::
     */
    $('.ul-span').click(function(e){
        e.preventDefault();

        if ($('.ul-menu').hasClass('active')){
            $('.ul-menu').fadeOut(175);
            $('.ul-menu').removeClass('active');
        }
        else{
            $('.ul-menu').fadeIn(175);
            $('.ul-menu').addClass('active');
        }
        // return false;

    });
    $(document).on('click', function(event) {
    	if (!$(event.target).closest('.ul-span').length) {
    		$('.ul-menu').removeClass('active');
    		$('.ul-menu').fadeOut(175);
    	}
    });
});
