'use strict';

require('dotenv').load();

var generator = require('./generator');
var Seqs = require('./seqs');
var lang = 'ro';

generator.generate(lang, 'top-mobtel-countries', Seqs.access)
	.catch(function(error) {
		console.error(error);
	})
	.then(function() {
		console.log('generated!');
	});
