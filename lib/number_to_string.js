'use strict';

var NUMBER_SEPARATORS = {
	point_comma: ['.', ','],
	comma_point: [',', '.'],
	space_comma: [' ', ',']
};

var LANG_NUMBER_SEPARATORS = {
	ro: 'point_comma',
	ru: 'space_comma',
	en: 'comma_point'
};

function getNumberSeparators(language) {
	return NUMBER_SEPARATORS[LANG_NUMBER_SEPARATORS[language] || LANG_NUMBER_SEPARATORS.en];
}

function numberFormatInternal(number, decimals, thousandsSep, decPoint) {
	decimals = isNaN(decimals) ? 2 : Math.abs(decimals);
	decPoint = (decPoint === undefined) ? '.' : decPoint;
	thousandsSep = (thousandsSep === undefined) ? ',' : thousandsSep;

	var sign = number < 0 ? '-' : '';
	number = Math.abs(+number || 0);

	var intPart = parseInt(number.toFixed(decimals), 10) + '';
	var j = intPart.length > 3 ? intPart.length % 3 : 0;

	return sign + (j ? intPart.substr(0, j) + thousandsSep : '') + intPart.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousandsSep) + (decimals ? decPoint + Math.abs(number - intPart).toFixed(decimals).slice(2) : '');
}

module.exports = function(number, decimals, language) {
	if (typeof decimals === 'string') {
		language = decimals;
		decimals = undefined;
	}
	language = language || 'en';
	var separators = getNumberSeparators(language);
	return numberFormatInternal(number, decimals, separators[0], separators[1]);
};
