'use strict';

global.Intl = require('intl');

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
		removeEmptyAttributes: true
	});
}

function start(options) {
	var lang = options.lang;
	var name = options.name;
	var callback = options.callback;

	var template = Articles.getArticle(lang, name);
	if (!template.header.slug) {
		return Promise.reject(new Error('Article must contain an unique slug'));
	}
	var model = Articles.getModel(template.header.model || name);
	var compiledArticleBody = _.template(template.body);
	var compiledArticleTitle = _.template(template.header.title);
	var compiledArticleSummary = _.template(template.header.summary);
	var compiledArticleSlug = _.template(template.header.slug);
	var compiledArticleHeadline = _.template(template.header.headline);

	var targets = template.header.target;

	if (targets) {
		targets = Data.topics.topicsByType(targets, lang);
	} else {
		targets = [null];
	}

	return Promise.each(targets, function(target, index) {
		console.log('rendering', name, index);
		return model.create({
				target: target,
				lang: lang,
				header: template.header
			}, {
				lang: lang,
				util: utils
			})
			.timeout(1000 * 20)
			.catch(function(error) {
				return Promise.reject(error);
			})
			.then(function(modelData) {
				if (!modelData) {
					return callback(null, index);
				}
				var articleData = model.data(modelData, {
					target: target
				});
				var html = compiledArticleBody(modelData);
				html = helpers.markdown(html);
				var title = compiledArticleTitle(modelData);
				var headline = compiledArticleHeadline(modelData);
				var summary = compiledArticleSummary(modelData);
				var slug = compiledArticleSlug(modelData);
				slug = Storage.formatter.createArticleSlug(slug);
				// summary = summary || helpers.createSummary(html);

				if (articleData.topics) {
					articleData.topics = articleData.topics.map(function(topic) {
						return topic.id || topic;
					});
				}

				html = minifyHtml(html);

				var article = {
					type: template.header.type,
					categories: template.header.categories,
					topics: articleData.topics,
					countItems: articleData.countItems,
					text: html,
					data: modelData,
					header: template.header,
					headline: headline,
					lang: lang,
					name: name,
					title: title,
					summary: summary,
					slug: slug,
					imageId: template.header.imageId,
					textHash: Storage.formatter.createArticleTextHash(html),
					id: Storage.formatter.createArticleId({
						slug: slug,
						lang: lang
					})
				};
				console.log('rendered', name, index);
				return Promise.resolve(callback(article, index)).delay(500);
			});
	});
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
