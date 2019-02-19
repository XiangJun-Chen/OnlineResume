require.config({
	paths: {
		'jquery': 'jquery-1.11.3-min',
		'carouFredSel': 'jquery.carouFredSel-6.2.1-min',
		'lazyload': 'jquery.lazyload.min',
		'easing': 'jquery.easing-1.3-min',
		'sly': 'jquery.sly-1.5.1-min',
		'fullpage': 'jquery.fullPage.min',
		'sketch': 'jquery.sketch',
		'lib': 'lib'
	},
	shim: {
		'carouFredSel': {
			deps: ['jquery']
		},
		'lazyload': {
			deps: ['jquery']
		},
		'easing': {
			deps: ['jquery']
		},
		'sly': {
			deps: ['jquery']
		},
		'fullpage': {
			deps: ['jquery']
		},
		'sketch': {
			deps: ['jquery']
		}
	}
});