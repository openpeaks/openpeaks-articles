'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

exports.getModel = function(name) {
	return require('./models/' + name);
};

exports.getArticle = function(lang, name) {
	var file = path.join(__dirname, '../data/articles', lang, name + '.md');
	var data = fs.readFileSync(file, 'utf8');
	return helpers.parseFileParts(data);
};
