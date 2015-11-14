#!/usr/bin/env node

require('dotenv').load();

var pkg = require('../package.json');
var program = require('commander');
program.version(pkg.version);

program
	.command('generate [lang] [name]')
	.description('Generates articles')
	.option('-l, --lang lang', 'Articles language')
	.option('-n, --name [name]', 'Article file/template name')
	.option('-t, --time [time]', 'Filter articles by last updated date: 30s, 10m, 2d')
	.action(function(lang, name, opts) {
		var options = {
			lang: lang || opts.lang,
			name: name || opts.name,
			time: opts.time
		};
		console.log('options', options);
		var action = require('../lib/actions/generator').start;
		return action(options);
	});

program.parse(process.argv);
