'use strict';

var _ = require('lodash');
var Promise = require('bluebird');

function clearObject(target) {
	for (var prop in target) {
		if (~[null, undefined, ''].indexOf(target[prop])) {
			delete target[prop];
		}
	}
	return target;
}

function topicName(name, lang) {
	if (lang && lang !== 'en' && name[lang]) {
		name = name[lang];
	}
	return name.common || name.official;
}

exports._ = _;
exports.Promise = Promise;
exports.foo = function() {};
exports.clearObject = clearObject;
exports.topicName = topicName;
