'use strict';

define(['jquery', 'lib/imageloaded', 'jquery.circlepacker'], function ($, imagesLoaded) {
	var teamModule = {
		maxHeight: 0,
		offset: {},
		init: function init() {
			this.cacheElements();
			this.loading();
			this.navBar();
		},
		cacheElements: function cacheElements() {
			this.$el = $('.team');
			this.$navbar = $('.team-navbar');
			this.$section = $('.section-adaptive');
			this.$gallery = this.$el.find('.photo-gallery');
			this.$cell = this.$gallery.find('.team-grid--1-of-3');
		},
		loading: function loading() {
			var $self = this;

			imagesLoaded(this.$gallery).on('progress', function (instance, image, el) {
				var result = image.isLoaded ? 'loaded' : 'broken';
				$(el).addClass(result);
			}).on('done', function () {
				$self.$gallery.removeClass('loader');

				$self.autoHeight();
				$self.resize();

				$self.activeNavbar();
			});
		},
		autoHeight: function autoHeight() {
			var $self = this;

			this.$cell.each(function (i, el) {
				if ($(el).height() > $self.maxHeight) {
					$self.maxHeight = $(el).height();
				}
			});

			if ($(window).width() <= 772) {
				$self.$gallery.height('auto');
			} else {
				$self.$gallery.height($self.maxHeight);
			}
		},
		resize: function resize() {
			var $self = this;
			$(window).on('resize', function () {
				$self.autoHeight();
			});
		},
		navBar: function navBar() {
			var $self = this;
			var last = void 0;

			this.$section.each(function () {
				$self.offset[this.id] = $(this).offset().top.toFixed();
			});

			$(window).on('scroll resize', function () {
				var scrollTop = $(this).scrollTop() + 1;
				var current = $self.$section.map(function () {
					if ($self.offset[this.id] <= scrollTop) {
						return this;
					}
				});
				current = current[current.length - 1];

				if (current && last !== current.id) {
					last = current.id;
					$self.$navbar.find('a').removeClass('is-active');
					$self.$navbar.find('a[href*="' + last + '"]').addClass('is-active');
				}
			});
		},
		activeNavbar: function activeNavbar() {
			var $self = this;
			var $header = $('.global--header');
			var stepRun = this.$gallery.offset().top + this.$gallery.height() - 2;
			var stepRunMobile = $header.offset().top + $header.height() - 2;

			$(window).on('scroll resize', function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > stepRun && scrollTop > stepRunMobile) {
					$self.$navbar.addClass('is-sticky');

					// For animate items
					$self.$navbar.addClass('module-loaded');
				} else {
					$self.$navbar.removeClass('is-sticky');
				}
			});
		}
	};

	teamModule.init();

	// const prefix = () => {
	// 	let styles = window.getComputedStyle(document.documentElement, '');
	// 	let pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];
	// 	let dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
	//
	// 	return {
	// 		dom: dom,
	// 		lowercase: pre,
	// 		css: '-' + pre + '-',
	// 		js: pre[0].toUpperCase() + pre.substr(1)
	// 	};
	// };

	var teamMember = {
		cacheElements: function cacheElements() {
			this.$people = $('.people');
			this.$holder = this.$people.find('.people-holder');
			this.$person = this.$holder.find('._person');
		},
		init: function init() {
			this.cacheElements();
			this.visualize();
			this.tooltip();
		},
		onScreen: function onScreen(elem) {
			var $window = $(window);
			var viewport_top = $window.scrollTop();
			var viewport_height = $window.height();
			var viewport_bottom = viewport_top + viewport_height;
			var $elem = $(elem);
			var top = $elem.offset().top;
			var height = $elem.height();
			var bottom = top + height;

			return top >= viewport_top && top < viewport_bottom || bottom > viewport_top && bottom <= viewport_bottom || height > viewport_height && top <= viewport_top && bottom >= viewport_bottom;
		},
		visualize: function visualize() {
			var $self = this;

			var ilertal = setInterval(function () {
				if ($self.onScreen($self.$people)) {
					$self.$people.addClass('was-blubbed');

					setTimeout(function () {
						$self.blubbed();
					}, 1000);

					clearInterval(ilertal);
				}
			}, 1000);
		},
		tooltip: function tooltip() {
			var $self = this;
			this.$person.on('click', function (e) {
				var $el = $(this);
				var job = $el.data("people-job"),
				    name = $el.data("people-name");

				var text = '<p class="name">' + name + '</p><p class="job">' + job + '</p>';
				$self.clickable(e, text, $el);
			});

			this.$person.on('mouseleave', function (e) {
				$self.mouseLeave(e);
			});
		},
		clickable: function clickable(e, text, $el) {
			if (typeof text !== 'undefined') {

				this.mouseLeave();

				var offset = $el.offset();
				var tbody = document.createElement('div');
				$(tbody).addClass('person__box temp').html('<p>' + text + '</p>').appendTo($("body"));

				// Calculate after append
				var bWidth = $(tbody).outerWidth() > $el.width() ? $(tbody).outerWidth() : $el.width(),
				    lWidth = $(tbody).outerWidth() < $el.width() ? $(tbody).outerWidth() : $el.width(),
				    dWidth = bWidth - lWidth,
				    topVal = offset.top - $(tbody).outerHeight() - 12,
				    leftVal = offset.left - dWidth / 2;

				$(tbody).css({
					top: topVal,
					left: leftVal
				}).fadeIn("fast");
			}
		},
		mouseLeave: function mouseLeave() {
			$('.person__box.temp').remove();
		},
		random: function random(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		blubbed: function blubbed() {
			var $self = this;

			// imagesLoaded($self.$holder)
			// .on('done', function() {
			// 	$($self.$person).addClass('shaking');
			// });

			this.$person.each(function () {
				// Create size of circle via random number
				var _dataPack = $(this).data();
				var _size = $self.random(70, 90);
				if (_dataPack.statePosition === 1) {
					// console.log(7);
					_size = $self.random(130, 160);
				} else if (_dataPack.statePosition === 2) {
					// console.log(5);
					_size = $self.random(105, 120);
				}
				var _radius = Math.round(_size / 1.5 + 1);

				// create randomly sized Circle from divs
				$(this).css({
					width: _size,
					height: _size,
					89: -1 * _size / 2,
					marginTop: -1 * _size / 2,
					borderRadius: _radius
				});
			});

			this.$holder.circlePacker(this.$person, {
				damping: 0.1, // Amount to move during iterations
				dampingAccel: 0.98, // How quickly should it come to a stop
				dampingCutoff: 0.001, // For quicker stopping (less accuracy),
				appendClass: 'is-active',
				callback: function callback(circleHolder) {
					// circleHolder is reference back to holder
					$($self.$person).addClass('shaking');
					// console.log('Finished Packing '+circleHolder.children().length+' Circles');
				}
			});
		}
	};
	teamMember.init();
});
//# sourceMappingURL=team.js.map
