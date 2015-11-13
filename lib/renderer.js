'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var _ = utils._;
var htmlMinifier = require('html-minifier');

function parseFileParts(content) {
	var yaml = require('js-yaml');

	var regex = /^\s*[^\n]*?(([^\s\d\w])\2{2,})(?:\x20*([a-z]+))?([\s\S]*?)[^\n]*?\1[^\n]*/;

	var match = regex.exec(content);
	if (match) {
		return {
			seperator: match[1],
			parser: match[3] || 'yaml',
			header: yaml.safeLoad(match[4].trim().split('\n').map(function(line) {
				return line.trim();
			}).join('\n')),
			body: content.substring(match[0].length).trim()
		};
	} else {
		return {
			header: {},
			body: content
		};
	}
}

function getModel(name) {
	return require('./models/' + name);
}

function getArticle(lang, name) {
	var file = path.join(__dirname, '../data/articles', lang, name + '.md');
	var data = fs.readFileSync(file, 'utf8');
	return parseFileParts(data);
}

function renderArticle(lang, name, seqsAccessService) {

	var article = getArticle(lang, name);
	var model = getModel(article.header.model);
	var compiledArticleBody = _.template(article.body);

	return model.create({
			seqs: seqsAccessService
		})
		.then(function(modelData) {
			var html = compiledArticleBody(modelData);
			html = htmlMinifier.minify(html, {
				removeComments: true,
				removeCommentsFromCDATA: true,
				collapseWhitespace: true,
				removeEmptyAttributes: true,
				removeEmptyElements: true
			});
			return {
				html: html,
				data: modelData,
				header: article.header,
				lang: lang,
				name: name
			};
		});
}

exports.renderArticle = renderArticle;
exports.render = renderArticle;
