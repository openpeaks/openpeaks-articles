'use strict';

var utils = require('../utils');
var _ = utils._;
var Data = require('../data');
var fs = require('fs');
var path = require('path');

exports.generate = function(lang, name, seqsAccessService) {
	var article = Data.articles.getArticle(lang, name);
	var compiledArticleBody = _.template(article.body);

	var model = Data.articles.getModel(article.header.model);

	return model.create({
			seqs: seqsAccessService,
			data: Data
		})
		.then(function(modelData) {
			var html = compiledArticleBody(modelData);
			var file = path.join(__dirname, '../../out', name + '.html');
			// console.log('file', file);
			fs.writeFileSync(file, html);

			return {
				html: html,
				name: name,
				lang: lang,
				data: modelData,
				header: article.header
			};
		});
};
