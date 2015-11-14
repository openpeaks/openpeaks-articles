#!/usr/bin/env node

'use strict';

require('dotenv').load();

var pkg = require('../package.json');
var program = require('commander');
program.version(pkg.version);

function clearOptions(options) {
	for (var prop in options) {
		if (typeof options[prop] !== 'string') {
			delete options[prop];
		}
	}
	return options;
}

program
	.command('generate [lang]')
	.description('Generates articles')
	.option('-l, --lang lang', 'Articles language')
	.option('-n, --name [name]', 'Article file/template name', /^[\w\d-]+$/)
	.option('-t, --time [time]', 'Filter articles by last updated date: 30s, 10m, 2d')
	.option('-o, --output [output]', 'Output directory')
	.action(function(lang, opts) {
		var options = {
			lang: lang || opts.lang,
			name: opts.name,
			output: opts.output,
			time: opts.time
		};
		options = clearOptions(options);
		console.log('options:', options);
		var action = require('../lib/actions/generator').start;
		return action(options);
	});

program
	.command('validate [lang] [name]')
	.description('Validates articles')
	.option('-l, --lang lang', 'Articles language')
	.option('-n, --name name', 'Article file/template name')
	.action(function(lang, name, opts) {
		var options = {
			lang: lang || opts.lang,
			name: name || opts.name
		};
		options = clearOptions(options);
		console.log('options:', options);
		var action = require('../lib/actions/validator').start;
		return action(options);
	});

program.parse(process.argv);
