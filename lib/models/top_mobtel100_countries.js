'use strict';

var utils = require('../utils');
var Promise = utils.Promise;
var Topics = require('../data').topics;
var seqs = require('../seqs').access;

module.exports = {
	/**
	 * Creates the model.
	 * @param {object} options - Params
	 * @param {object} options.target - Target topic
	 * @param {string} options.lang - Article language
	 * @param {object} [model] - Model object
	 * @returns {object}
	 */
	create: function(options, model) {
		model = model || {};
		var lang = options.lang || model.lang;

		function formatModel(name, rows) {
			model[name] = [];
			rows.forEach(function(row) {
				var item = {};
				item.data = row;
				item.topic = Topics.getCountry(row.value, lang);
				if (item.topic) {
					model[name].push(item);
				} else {
					console.error('not found topic', row.value);
				}
			});
			return model;
		}

		var props = {
			top: seqs.queryValues({
				key: 'MOBTEL100.TOP#latest',
				limit: 10,
				attributes: ['range', 'value', 'label'],
				sort: 'descending'
			}),
			top2: seqs.queryValues({
				key: 'MOBTEL100.TOP#latest',
				limit: 10,
				attributes: ['range', 'value', 'label']
			})
		};

		return Promise.props(props)
			.then(function(result) {
				formatModel('topCountries', result.top);
				formatModel('topCountries2', result.top2);
				return model;
			});
	},
	topics: function(model) {
		var topics = [];

		for (var i = 0; i < model.topCountries.length && i < 5; i++) {
			topics.push(model.topCountries[i].topic);
		}

		return topics;
	}
};
