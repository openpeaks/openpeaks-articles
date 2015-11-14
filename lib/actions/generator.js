'use strict';

var renderer = require('../renderer');
var utils = require('../utils');
var _ = utils._;
var Promise = utils.Promise;
var ms = require('ms');

function createOptions(options) {
	options = _.clone(options);
	if (options.name) {
		options.name = options.name.split(/[,;|]/g);
		options.name = options.name.filter(function(name) {
			return name.trim().length > 0;
		});

		delete options.time;
	} else if (options.time) {
		options.time = ms(options.time);
	}

	return options;
}

function generate(lang, name) {
	return new Promise(function(resolve, reject) {
		var r = renderer.render(lang, name);
		r.on('error', reject);
		r.on('article', function(article) {
			console.log('article', article.title);
		});
		r.on('end', resolve);
	});
}

exports.start = function(options) {
	options = createOptions(options);

	if (!options.lang) {
		return Promise.reject(new Error('Option lang is required'));
	}

	return Promise.each(options.name, function(name) {
		return generate(options.lang, name);
	});
};
