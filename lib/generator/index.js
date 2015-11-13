'use strict';

var fs = require('fs');
var path = require('path');
var renderer = require('../renderer');

exports.generate = function(lang, name, seqsAccessService) {
	return renderer.renderArticle(lang, name, seqsAccessService)
		.then(function(article) {
			var file = path.join(__dirname, '../../out', name + '.html');
			fs.writeFileSync(file, article.html);
		});
};
