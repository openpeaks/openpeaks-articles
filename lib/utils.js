'use strict';

var _ = require('lodash');
var Promise = require('bluebird');

function clearObject(target){
	for(var prop in target){
		if(~[null, undefined, ''].indexOf(target[prop])){
			delete target[prop];
		}
	}
	return target;
}

exports._ = _;
exports.Promise = Promise;
exports.foo = function() {};
exports.clearObject = clearObject;
exports.numberToString = require('./number_to_string');
