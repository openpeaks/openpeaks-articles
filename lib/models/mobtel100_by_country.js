'use strict';

var utils = require('../utils');
var Promise = utils.Promise;
var seqs = require('../seqs').access;

module.exports = {
	/**
	 * Creates the model.
	 * @param {object} options - Params
	 * @param {object} options.target - Target topic
	 * @param {object} [model] - Model object
	 * @returns {object}
	 */
	create: function(options, model) {
		model = model || {};
		var target = model.country = options.target;

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
				return model;
			});
	}
};
