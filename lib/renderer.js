'use strict';

var utils = require('./utils');
var _ = utils._;
var Promise = utils.Promise;
var htmlMinifier = require('html-minifier');
var helpers = require('./helpers');
var Data = require('./data');
var Storage = require('./storage');
var Articles = require('./articles');

function minifyHtml(html) {
	return htmlMinifier.minify(html, {
		removeComments: true,
		removeCommentsFromCDATA: true,
		collapseWhitespace: true,
		removeEmptyAttributes: true,
		removeEmptyElements: true
	});
}

function start(options) {
	var lang = options.lang;
	var name = options.name;
	var seqsAccessService = options.seqsAccessService;
	var callback = options.callback;

	var article = Articles.getArticle(lang, name);
	if (!article.header.slug) {
		return Promise.reject(new Error('Article must contain an unique slug'));
	}
	var model = Articles.getModel(article.header.model);
	var compiledArticleBody = _.template(article.body);
	var compiledArticleTitle = _.template(article.header.title);
	var compiledArticleSummary = _.template(article.header.summary);
	var compiledArticleSlug = _.template(article.header.slug);

	var targets = article.header.target;

	if (targets) {
		targets = Data.topics.topicsByType(targets);
	} else {
		targets = [null];
	}

	return Promise.each(targets, function(target, index) {
		console.log('rendering', name, index);
		return model.create({
				seqs: seqsAccessService,
				target: target
			})
			.timeout(1000 * 10)
			.catch(function(error) {
				return Promise.reject(error);
			})
			.then(function(modelData) {
				if (!modelData) {
					return callback(null, index);
				}
				var html = compiledArticleBody(modelData);
				html = helpers.markdown(html);
				var title = compiledArticleTitle(modelData);
				var summary = compiledArticleSummary(modelData);
				var slug = compiledArticleSlug(modelData);
				slug = Storage.formatter.createArticleSlug(slug);
				summary = summary || helpers.createSummary(html);

				html = minifyHtml(html);

				var articleData = {
					text: html,
					data: modelData,
					header: article.header,
					lang: lang,
					name: name,
					title: title,
					summary: summary,
					slug: slug,
					textHash: Storage.formatter.createArticleTextHash(html),
					id: Storage.formatter.createArticleId({
						slug: slug,
						lang: lang
					})
				};
				console.log('rendered', name, index);
				return Promise.resolve(callback(articleData, index)).delay(500);
			});
	}).timeout(1000 * 30 * targets.length);
}

exports.render = function(options) {
	if (!options.lang) {
		return Promise.reject(new Error('Lang is required'));
	}
	if (!options.name) {
		return Promise.reject(new Error('Name is required'));
	}
	if (!options.callback) {
		return Promise.reject(new Error('Callback is required'));
	}
	if (!options.seqsAccessService) {
		options.seqsAccessService = require('./seqs').access;
	}

	return start(options);
};
