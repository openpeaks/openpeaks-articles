'use strict';

var utils = require('../utils');
var Promise = utils.Promise;
// var Topics = require('../data').topics;

module.exports = {
	/**
	 * Creates the model.
	 * @param {object} options - Params
	 * @param {object} options.model - Base model
	 * @param {object} options.seqs - A seqs access service
	 */
	create: function(options) {
		var seqs = options.seqs;
		var model = options.model || {};
		var target = options.target;

		model.target = model.country = target;

		var props = {
			values: seqs.queryValues({
				key: 'MOBTEL.VALUE#' + target.id,
				limit: 100,
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
