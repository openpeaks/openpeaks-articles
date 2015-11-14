'use strict';

var renderer = require('../renderer');
var Articles = require('../articles');
var Storage = require('../storage');
var utils = require('../utils');
var _ = utils._;
var Promise = utils.Promise;
var Joi = require('joi');

var TEMPLATE_SCHEMA = {
	body: Joi.string().min(400).required(),
	header: Joi.object().keys({
		title: Joi.string().min(10).max(200).required(),
		slug: Joi.string().min(10).max(200).required(),
		model: Joi.string().regex(/^[\w-\d]{5,50}$/).required(),
		target: Joi.string().regex(/^[\w-\d:]{5,50}$/)
	}).required()
};

var ARTICLE_SCHEMA = {
	id: Joi.string().length(32).required(),
	textHash: Joi.string().length(40).required(),
	text: Joi.string().min(400).required(),
	title: Joi.string().min(10).max(200).required(),
	slug: Joi.string().min(10).max(200).required()
};

function createOptions(options) {
	options = _.clone(options);
	if (options.name) {
		options.name = options.name.split(/[,;|]/g);
		options.name = options.name.filter(function(name) {
			return name.trim().length > 0;
		});
	}

	return options;
}

function validateArticleTemplate(article) {
	var result = Joi.validate(article, TEMPLATE_SCHEMA, {
		allowUnknown: true
	});
	if (result.error) {
		throw result.error;
	}
}

function validateArticle(article) {
	if (!article) {
		return;
	}
	var result = Joi.validate(article, ARTICLE_SCHEMA, {
		allowUnknown: true
	});
	if (result.error) {
		throw result.error;
	}
}

function validate(lang, name) {
	var article = Articles.getArticle(lang, name);
	validateArticleTemplate(article);
	Articles.getModel(article.header.model);

	return renderer.render({
		lang: lang,
		name: name,
		callback: validateArticle
	});
}

exports.start = function(options) {
	options = createOptions(options);

	if (!options.lang) {
		return Promise.reject(new Error('Option lang is required'));
	}

	return Promise.each(options.name, function(name) {
			return validate(options.lang, name);
		})
		.finally(function() {
			return Storage.close();
		});
};
