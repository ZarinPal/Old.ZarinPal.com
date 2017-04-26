requirejs.config({
	baseUrl: '/assets/js/',
	paths: {
		jquery: 'lib/jquery',
		bowser: 'lib/bowser',
		TweenMax: 'lib/TweenMax',
		Segment: 'lib/segment.min',
		Ease: 'lib/ease.min',
		app: 'modules/initial',
		'jquery.circlepacker': 'lib/circlepacker',
	},
	"shim": {
		"jquery.circlepacker": ["jquery"],
	},
});
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)};i[r].l=1*new Date();a=s.createElement(o);
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-19706501-5', 'auto');
ga('send', 'pageview');
// (function() {
// 	/* In animations (to close icon) */
// 	var beginAC = 80,
// 		endAC = 320,
// 		beginB = 80,
// 		endB = 320;
// 	function inAC(s) {
// 		s.draw('80% - 240', '80%', 0.3, {
// 			delay: 0.1,
// 			callback: function() {
// 				inAC2(s)
// 			}
// 		});
// 	}
// 	function inAC2(s) {
// 		s.draw('100% - 545', '100% - 305', 0.6, {
// 			easing: ease.ease('elastic-out', 1, 0.3)
// 		});
// 	}
// 	function inB(s) {
// 		s.draw(beginB - 60, endB + 60, 0.1, {
// 			callback: function() {
// 				inB2(s)
// 			}
// 		});
// 	}
// 	function inB2(s) {
// 		s.draw(beginB + 120, endB - 120, 0.3, {
// 			easing: ease.ease('bounce-out', 1, 0.3)
// 		});
// 	}
// 	/* Out animations (to burger icon) */
// 	function outAC(s) {
// 		s.draw('90% - 240', '90%', 0.1, {
// 			easing: ease.ease('elastic-in', 1, 0.3),
// 			callback: function() {
// 				outAC2(s)
// 			}
// 		});
// 	}
// 	function outAC2(s) {
// 		s.draw('20% - 240', '20%', 0.3, {
// 			callback: function() {
// 				outAC3(s)
// 			}
// 		});
// 	}
// 	function outAC3(s) {
// 		s.draw(beginAC, endAC, 0.7, {
// 			easing: ease.ease('elastic-out', 1, 0.3)
// 		});
// 	}
// 	function outB(s) {
// 		s.draw(beginB, endB, 0.7, {
// 			delay: 0.1,
// 			easing: ease.ease('elastic-out', 2, 0.4)
// 		});
// 	}
// 	/* Awesome burger default */
// 	var pathA = document.getElementById('pathA'),
// 		pathB = document.getElementById('pathB'),
// 		pathC = document.getElementById('pathC'),
// 		segmentA = new Segment(pathA, beginAC, endAC),
// 		segmentB = new Segment(pathB, beginB, endB),
// 		segmentC = new Segment(pathC, beginAC, endAC),
// 		trigger = document.getElementById('menu-icon-wrapper'),
// 		toCloseIcon = true,
// 		dummy = document.getElementById('dummy'),
//         dummyBg = document.getElementById('dummy__bg'),
// 		wrapper = document.getElementById('menu-icon-wrapper');
// 	wrapper.style.visibility = 'visible';
// 	trigger.onclick = function() {
// 		if (toCloseIcon) {
// 			// inAC(segmentA);
// 			// inB(segmentB);
// 			// inAC(segmentC);
// 			// wrapper.className = 'is-active';
// 			dummy.className = 'dummy__active';
//             dummyBg.className= 'dummy__bg__active';
// 		} else {
// 			// outAC(segmentA);
// 			// outB(segmentB);
// 			// outAC(segmentC);
// 			// wrapper.classList.remove('is-active');
// 			dummy.className = 'dummy__out';
//             dummyBg.className = 'dummy__bg__out'
// 		}
// 		toCloseIcon = !toCloseIcon;
// 	};
// 	/* Scale functions */
// 	function addScale(m) {
// 		m.className = 'menu-icon-wrapper scaled';
// 	}
// 	function removeScale(m) {
// 		m.className = 'menu-icon-wrapper';
// 	}
// 	/* Awesome burger scaled */
// 	var pathD = document.getElementById('pathD'),
// 		pathE = document.getElementById('pathE'),
// 		pathF = document.getElementById('pathF'),
// 		segmentD = new Segment(pathD, beginAC, endAC),
// 		segmentE = new Segment(pathE, beginB, endB),
// 		segmentF = new Segment(pathF, beginAC, endAC),
// 		wrapper2 = document.getElementById('menu-icon-wrapper2'),
// 		trigger2 = document.getElementById('menu-icon-trigger2'),
// 		toCloseIcon2 = true,
// 		dummy2 = document.getElementById('dummy2');
// 	wrapper2.style.visibility = 'visible';
// 	trigger2.onclick = function() {
// 		addScale(wrapper2);
// 		if (toCloseIcon2) {
// 			inAC(segmentD);
// 			inB(segmentE);
// 			inAC(segmentF);
// 			dummy2.className = 'dummy dummy--active';
// 		} else {
// 			outAC(segmentD);
// 			outB(segmentE);
// 			outAC(segmentF);
// 			dummy2.className = 'dummy';
// 		}
// 		toCloseIcon2 = !toCloseIcon2;
// 		setTimeout(function() {
// 			removeScale(wrapper2)
// 		}, 450);
// 	};
// });
