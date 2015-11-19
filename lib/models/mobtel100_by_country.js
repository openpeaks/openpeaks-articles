'use strict';

var utils = require('../utils');
var _ = utils._;
var Promise = utils.Promise;
var seqs = require('../seqs').access;

function calculBoom(model) {
	var rValues = model.reverseValues;
	var boomYear = rValues[0].range;
	var boomDiff = 0;
	var boomValue = 0;
	var prevValue = rValues[0].value;
	rValues.forEach(function(item) {
		var diff = item.value - prevValue;
		if (diff > boomDiff) {
			boomYear = item.range;
			boomDiff = diff;
			boomValue = item.value;
		}
		prevValue = item.value;
	});

	model.boomYear = boomYear;
	model.boomPercent = (boomDiff / boomValue) * 100;
}

function createCharts(model) {
	model.charts = [{
		selector: '#mobdel100-chart-' + model.country.cca2,
		type: 'line',
		data: {
			labels: _.pluck(model.reverseValues, 'range'),
			series: [_.pluck(model.reverseValues, 'value').map(function(value) {
				return Number(value.toFixed(2));
			})]
		}
	}];
}

function calculDecrease(model) {
	var rValues = model.reverseValues;
	var decreaseYear = rValues[0].range;
	var decreaseDiff = 0;
	var decreaseValue = 0;
	var prevValue = rValues[0].value;
	rValues.forEach(function(item) {
		var diff = item.value - prevValue;
		if (diff < decreaseDiff) {
			decreaseYear = item.range;
			decreaseDiff = diff;
			decreaseValue = item.value;
		}
		prevValue = item.value;
	});

	if (decreaseDiff < 0) {
		model.decreaseYear = decreaseYear;
		model.decreasePercent = (decreaseDiff / decreaseValue) * 100;
	}
}

module.exports = {
	/**
	 * Creates the model.
	 * @param {object} options - Params
	 * @param {object} options.target - Target topic
	 * @param {object} [model] - Model object
	 * @returns {object}
	 */
	create: function(options, model) {
		var target = model.country = options.target;

		model.countryName = model.util.topicName(target.name, model.lang);

		var props = {
			values: seqs.queryValues({
				key: 'MOBTEL100.VALUE#' + target.id,
				limit: 30,
				attributes: ['range', 'value', 'label'],
				sort: 'descending'
			})
		};

		return Promise.props(props)
			.then(function(result) {
				if (!result.values || result.values.length === 0) {
					return null;
				}
				model.values = result.values;
				model.reverseValues = model.values.slice().reverse();
				calculBoom(model);
				calculDecrease(model);
				createCharts(model);

				return model;
			});
	},
	data: function(model, options) {
		var data = {
			topics: [options.target],
			countItems: model.values.length
		};

		return data;
	}
};
