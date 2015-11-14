'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var _ = utils._;
var Promise = utils.Promise;
var htmlMinifier = require('html-minifier');
var helpers = require('./helpers');
var EventEmitter = require('events');
var Data = require('./data');

function getModel(name) {
	return require('./models/' + name);
}

function getArticle(lang, name) {
	var file = path.join(__dirname, '../data/articles', lang, name + '.md');
	var data = fs.readFileSync(file, 'utf8');
	return helpers.parseFileParts(data);
}

function minifyHtml(html) {
	return htmlMinifier.minify(html, {
		removeComments: true,
		removeCommentsFromCDATA: true,
		collapseWhitespace: true,
		removeEmptyAttributes: true,
		removeEmptyElements: true
	});
}

function startRender(emitter, lang, name, seqsAccessService) {
	var article = getArticle(lang, name);
	var model = getModel(article.header.model);
	var compiledArticleBody = _.template(article.body);
	var compiledArticleTitle = _.template(article.header.title);
	var compiledArticleSummary = _.template(article.header.summary);

	var targets = article.header.target;

	if (targets) {
		targets = Data.topics.topicsByType(targets);
	} else {
		targets = [null];
	}

	Promise.each(targets, function(target) {
			return model.create({
					seqs: seqsAccessService,
					target: target
				})
				.catch(function(error) {
					emitter.emit('error', error);
					return Promise.reject(error);
				})
				.then(function(modelData) {
					var html = compiledArticleBody(modelData);
					var title = compiledArticleTitle(modelData);
					var summary = compiledArticleSummary(modelData);

					html = minifyHtml(html);

					var articleData = {
						text: html,
						data: modelData,
						header: article.header,
						lang: lang,
						name: name,
						title: title,
						summary: summary
					};

					emitter.emit('article', articleData);
				});
		})
		.finally(function() {
			emitter.emit('end');
		});
}

function render(lang, name, seqsAccessService) {
	var emitter = new EventEmitter();

	if (!seqsAccessService) {
		seqsAccessService = require('./seqs').access;
	}

	startRender(emitter, lang, name, seqsAccessService);

	return emitter;
}

exports.render = render;
