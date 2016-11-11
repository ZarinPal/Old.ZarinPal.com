$.fn.circlePacker = function(circles, options) {

	// Create some defaults, extending them with any options that were provided
	var settings = $.extend({
		'damping' : 0.1,
		'dampingAccel' : 0.98,
		'dampingCutoff' : 0.007,
	}, options);


	return this.each(function() {
		//reference to (this) holder of circles
		var container = $(this);

		//center of container
		var centerX = container.width()/2;
		var centerY = container.height()/2;

		//array for holding circles
		var circAR = [];

		if (typeof settings.appendClass === 'string') { // make sure the appendClass is a string
			container.addClass(settings.appendClass);
			// settings.appendClass.call(container, container); // brings the scope to the appendClass
		}

		// jquery loop for positioning initially and setting data for top and left
		circles.each(function(i) {
			var left = 0;
			var top = 0;
			var radius = 0;
			if (i%2 == 0) {
				left = Math.floor(Math.random() * container.width() + container.width());
			} else {
				left = Math.floor(Math.random() * container.width() / 2);
			}
			top = Math.floor(Math.random() * container.height());
			radius = $(this).width() / 2 + 6;

			$(this).css({ 'left': left, 'top': top });
			$(this).data('xPos', left);
			$(this).data('yPos', top);
			$(this).data('radius', radius);

			circAR.push($(this));
		});

		// reassign array for circles
		circles = circAR;

		// sort array by distance from center
		// circles = circles.sort(sortFromCenter());

		// iterated on
		var packCircles = function() {

			// iterated circle local insance
			var ci;
			var cj;
			// vector object
			var v;
			var dx;
			var dy;
			var r;
			var d;


			// Push away from each other
			for (var i=0; i<circles.length; i++) {
				ci = circles[i];
				// Compare each to other
				for (var j=0; j<circles.length; j++) {
					cj = circles[j];

					if (i == j) {
						continue;
					}

					// Properties
					v = {};
					dx = cj.data('xPos') - ci.data('xPos');
					dy = cj.data('yPos') - ci.data('yPos');
					r = ci.data('radius') + cj.data('radius');
					d = (dx*dx) + (dy*dy);
					var length;
					var scale;
					var l;
					var t;

					if (d < ((r*r) - 0.1)) {
						v.x = dx;
						v.y = dy;
						// Normalize vector
						var length = Math.sqrt(d);
						v.x = v.x / length;
						v.y = v.y / length;

						// Scale vector
						var scale = (r - length) * 0.5;
						v.x *= scale;
						v.y *= scale;

						l = ci.data('xPos') - v.x;
						t = ci.data('yPos') - v.y;

						// Move circle to new position
						ci.css({
							'top':t,
							'left':l
						});
						// ci.css(prefix().js+"Transform", `translate3d(${t}px, ${l}px, 0)`);
						ci.data('xPos',l);
						ci.data('yPos',t);
					}
				}
			}

			// deceleration for number of tries
			settings.damping *= settings.dampingAccel;

			// push toward center
			for (var i=0; i<circles.length; i++) {
				var c = circles[i];
				var x = (c.data('xPos') - centerX) * settings.damping;
				var y = (c.data('yPos') - centerY) * settings.damping;

				var l = Math.max(c.data('xPos') - x, c.data('radius'));
				var t = Math.max(c.data('yPos') - y, c.data('radius'));

				c.css({
					'top':t,
					'left':l
				});
				// c.css(prefix().js+"Transform", `translate3d(${t}px, ${l}px, 0)`);
				c.data('xPos',l);
				c.data('yPos',t);
			}

			if (settings.damping < settings.dampingCutoff) {
				// call callback function
				if (typeof settings.callback === 'function') { // make sure the callback is a function
					settings.callback.call(container, container); // brings the scope to the callback
				}
			} else {
				setTimeout(packCircles, 1000 / 60);
			}
		}
		setTimeout(packCircles, 1000 / 60);
	});
};

	// if (typeof define === 'function' && define.amd) {
	// 	define(['jquery'], function() {
	// 		return $.fn.circlePacker;
	// 	});
	// }

// })(jQuery);
