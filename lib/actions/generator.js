'use strict';

var renderer = require('../renderer');
var utils = require('../utils');
var _ = utils._;
var Promise = utils.Promise;
var ms = require('ms');
var fs = require('fs');
var path = require('path');
var mkdir = Promise.promisify(require('mkdirp'));
var Storage = require('../storage');

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
		var directory = path.join(__dirname, '../../data/articles', options.lang);
		var files = fs.readdirSync(directory);
		files = files.filter(function(file) {
			file = path.join(directory, file);
			var stat = fs.statSync(file);
			return stat.isFile() && stat.ctime.getTime() > Date.now() - options.time;
		});
		files = files.map(function(file) {
			return path.basename(file, '.md');
		});
		options.name = files;
	}

	return options;
}

function saveOnDisk(article, output) {
	var file = path.join(process.cwd(), output, article.lang);

	return mkdir(file).then(function() {
		file = path.join(file, [article.slug, 'html'].join('.'));
		fs.writeFileSync(file, article.text);
	});
}

function saveOnStorage(article) {
	var id = article.id;
	return Storage.access.article({
			where: {
				_id: id
			},
			select: 'textHash'
		})
		.then(function(dbArticle) {
			if (dbArticle) {
				console.log('updating article', id);
				return Storage.control.updateArticle(article)
					.then(function() {
						if (dbArticle.textHash !== article.textHash) {
							console.log('updating article text', article.textHash);
							return Storage.control.updateArticleText({
								id: id,
								text: article.text
							});
						} else {
							console.log('article text not changed');
						}
					});
			} else {
				console.log('creating article', id);
				return Storage.control.createArticle(article)
					.then(function() {
						console.log('created article', id);
						return Storage.control.createArticleText({
							id: id,
							text: article.text
						});
					});
			}
		});
}

function save(article, options) {
	if (!article) {
		return Promise.resolve();
	}
	console.log('saving', article.title);

	function callSave() {
		if (options.output) {
			return saveOnDisk(article, options.output);
		} else {
			return saveOnStorage(article);
		}
	}

	return callSave().then(function() {
		console.log('+ saved', article.title);
	});
}

function generate(lang, name, options) {
	return renderer.render({
		lang: lang,
		name: name,
		callback: function onArticleRendered(article) {
			return save(article, options).timeout(1000 * 5);
		}
	});
}

exports.start = function(options) {
	options = createOptions(options);

	if (!options.lang) {
		return Promise.reject(new Error('Option lang is required'));
	}

	return Promise.each(options.name, function(name) {
			return generate(options.lang, name, options);
		})
		.finally(function() {
			return Storage.close();
		});
};
