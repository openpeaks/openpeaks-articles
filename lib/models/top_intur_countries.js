'use strict';

var utils = require('../utils');
var _ = utils._;
var Promise = utils.Promise;
var Topics = require('../data').topics;
var seqs = require('../seqs').access;

function createUtils(model) {
	var topCountry = model.topCountries[0].topic;

	model.topCountry = topCountry;
	model.secondCountry = model.topCountries[1].topic;

	model.top2Diff = (model.topCountries[0].data.range - model.topCountries[1].data.range)/1000;

	model.sumLast10 = _.sum(model.topCountries2, 'data.range');
}

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
				key: 'INTUR.TOP_COUNT#latest',
				limit: 10,
				attributes: ['range', 'value', 'label'],
				sort: 'descending'
			}),
			top2: seqs.queryValues({
				key: 'INTUR.TOP_COUNT#latest',
				limit: 10,
				attributes: ['range', 'value', 'label']
			})
		};

		return Promise.props(props)
			.then(function(result) {
				formatModel('topCountries', result.top);
				formatModel('topCountries2', result.top2);

				createUtils(model);
				return model;
			});
	},
	data: function(model) {
		var data = {
			topics: [],
			countItems: 10
		};

		for (var i = 0; i < model.topCountries.length && i < 5; i++) {
			data.topics.push(model.topCountries[i].topic);
		}

		return data;
	}
};
