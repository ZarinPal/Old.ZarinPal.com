define(['jquery', 'lib/imageloaded', 'jquery.circlepacker'], function($, imagesLoaded) {
	const teamModule = {
		maxHeight: 0,
		offset: {},
		init: function() {
			this.cacheElements();
			this.loading();
			this.navBar();
		},
		cacheElements: function() {
			this.$el = $('.team');
			this.$navbar = $('.team-navbar');
			this.$section = $('.section-adaptive');
			this.$gallery = this.$el.find('.photo-gallery');
			this.$cell = this.$gallery.find('.team-grid--1-of-3');
		},
		loading: function() {
			const $self = this;

			imagesLoaded(this.$gallery)
			.on('progress', function(instance, image, el) {
				var result = image.isLoaded ? 'loaded' : 'broken';
				$(el).addClass(result);
			})
			.on('done', function() {
				$self.$gallery.removeClass('loader');

				$self.autoHeight();
				$self.resize();

				$self.activeNavbar();
			});
		},
		autoHeight: function() {
			var $self = this;

			this.$cell.each(function(i, el) {
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
		resize: function() {
			const $self = this;
			$(window).on('resize', function() {
				$self.autoHeight();
			});
		},
		navBar: function() {
			const $self = this;
			let last;

			this.$section.each(function(){
				$self.offset[this.id] = $(this).offset().top.toFixed();
			});

			$(window).on('scroll resize', function() {
				const scrollTop = $(this).scrollTop() + 1;
				let current = $self.$section.map(function(){
					if ($self.offset[this.id] <= scrollTop) {
						return this;
					}
				});
				current = current[current.length-1];

				if( current && last !== current.id ){
					last = current.id;
					$self.$navbar.find('a').removeClass('is-active');
					$self.$navbar.find('a[href*="'+last+'"]').addClass('is-active');
				}
			});

		},
		activeNavbar: function() {
			const $self = this;
			const stepRun = this.$gallery.offset().top + this.$gallery.height() - 2;

			$(window).on('scroll resize', function() {
				const scrollTop = $(window).scrollTop();
				if (scrollTop > stepRun) {
					$self.$navbar.addClass('is-sticky');

					// For animate items
					$self.$navbar.addClass('module-loaded');
				} else {
					$self.$navbar.removeClass('is-sticky');
				}
			});
		},
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

	const teamMember = {
		cacheElements() {
			this.$people = $('.people');
			this.$holder = this.$people.find('.people-holder');
			this.$person = this.$holder.find('._person');
		},
		init() {
			this.cacheElements();
			this.visualize();
			this.tooltip();
		},
		onScreen(elem) {
			let $window = $(window);
			let viewport_top = $window.scrollTop();
			let viewport_height = $window.height();
			let viewport_bottom = viewport_top + viewport_height;
			let $elem = $(elem);
			let top = $elem.offset().top;
			let height = $elem.height();
			let bottom = top + height;

			return  (top >= viewport_top && top < viewport_bottom) ||
					(bottom > viewport_top && bottom <= viewport_bottom) ||
					(height > viewport_height && top <= viewport_top && bottom >= viewport_bottom);
		},
		visualize() {
			const $self = this;

			const ilertal = setInterval(function() {
				if ($self.onScreen($self.$people)) {
					$self.$people.addClass('was-blubbed');

					setTimeout(() => {
						$self.blubbed();
					}, 1000);

					clearInterval(ilertal);
				}
			}, 1000);
		},
		tooltip() {
			var $self = this;
			this.$person.on('click',function(e){
				var $el = $(this);
				var job = $el.data("people-job"),
					name = $el.data("people-name");

				const text = `<p class="name">${name}</p><p class="job">${job}</p>`;
				$self.clickable(e, text, $el);
			});

			this.$person.on('mouseleave',function(e){
				$self.mouseLeave(e);
			});
		},
		clickable(e, text, $el) {
			if(typeof text !== 'undefined'){

				this.mouseLeave();

				var offset  = $el.offset();
				var tbody = document.createElement('div');
				$(tbody).addClass('person__box temp')
					.html(`<p>${text}</p>`)
					.appendTo($("body"));

				// Calculate after append
				var bWidth  = $(tbody).outerWidth() > $el.width() ? $(tbody).outerWidth() : $el.width(),
					lWidth  = $(tbody).outerWidth() < $el.width() ? $(tbody).outerWidth() : $el.width(),
					dWidth  = bWidth - lWidth,
					topVal  = (offset.top - $(tbody).outerHeight()) - 12,
					leftVal = (offset.left - (dWidth / 2));

				$(tbody).css({
					top: topVal,
					left: leftVal
				}).fadeIn("fast");
			}
		},
		mouseLeave() {
			$('.person__box.temp').remove();
		},
		random(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		blubbed() {
			const $self = this;

			// imagesLoaded($self.$holder)
			// .on('done', function() {
			// 	$($self.$person).addClass('shaking');
			// });

			this.$person.each(function() {
				// Create size of circle via random number
				const _dataPack = $(this).data();
				let _size = $self.random(70, 90);
				if (_dataPack.statePosition === 1) {
					// console.log(7);
					_size = $self.random(130, 160);
				} else if (_dataPack.statePosition === 2) {
					// console.log(5);
					_size = $self.random(105, 120);
				}
				const _radius = Math.round(_size / 1.5 + 1);

				// create randomly sized Circle from divs
				$(this).css({
					width: _size,
					height: _size,
					89: -1 * _size / 2,
					marginTop: -1 * _size / 2,
					borderRadius: _radius,
				});
			});

			this.$holder.circlePacker(this.$person, {
				damping: 0.1,	// Amount to move during iterations
				dampingAccel: 0.98, // How quickly should it come to a stop
				dampingCutoff: 0.001, // For quicker stopping (less accuracy),
				appendClass: 'is-active',
				callback: function(circleHolder) {
					// circleHolder is reference back to holder
					$($self.$person).addClass('shaking');
					// console.log('Finished Packing '+circleHolder.children().length+' Circles');
				},
			});
		},
	};
	teamMember.init();
});
