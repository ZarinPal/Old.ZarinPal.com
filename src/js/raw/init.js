requirejs.config({
	baseUrl: '/assets/js/',
	paths: {
		jquery: 'lib/jquery',
		bowser: 'lib/bowser',
		TweenMax: 'lib/TweenMax',
		app: 'modules/initial',
		'jquery.circlepacker': 'lib/circlepacker',
	},
	"shim": {
		"jquery.circlepacker": ["jquery"],
	},
});
