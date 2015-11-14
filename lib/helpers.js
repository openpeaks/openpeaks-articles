'use strict';

function parseFileParts(content) {
	var yaml = require('js-yaml');

	var regex = /^\s*[^\n]*?(([^\s\d\w])\2{2,})(?:\x20*([a-z]+))?([\s\S]*?)[^\n]*?\1[^\n]*/;

	var match = regex.exec(content);
	if (match) {
		return {
			seperator: match[1],
			parser: match[3] || 'yaml',
			header: yaml.safeLoad(match[4].trim().split('\n').map(function(line) {
				return line.trim();
			}).join('\n')),
			body: content.substring(match[0].length).trim()
		};
	} else {
		return {
			header: {},
			body: content
		};
	}
}

function createSummary(html, length) {
	length = length || 400;
	var sanitizer = require('sanitizer');
	var summary = sanitizer.sanitize(html);
	// Put new lines after p, br
	summary = summary.replace(/<\/p>/gmi, '</p>\n');
	summary = summary.replace(/<\/div>/gmi, '</div>\n');
	summary = summary.replace(/<(br|br\/|br \/)>/gmi, '\n');
	// Remove all remaining HTML tags.
	summary = summary.replace(/<(?:.|\n)*?>/gm, '');

	summary = sanitizer.unescapeEntities(summary);

	// RegEx to remove needless newlines and whitespace.
	// See: http://stackoverflow.com/questions/816085/removing-redundant-line-breaks-with-regular-expressions
	summary = summary.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/ig, '\n');

	summary = summary.replace(/\n\s+/g, '\n').replace(/\s+\n/g, '\n');

	summary = summary.replace(/([.])[ \t]{2,}/g, '$1 ');

	// Return the final string, minus any leading/trailing whitespace.
	return summary.substr(0, length).trim();
}

function markdown(text) {
	var marked = require('marked');
	return marked(text);
}

exports.markdown = markdown;
exports.createSummary = createSummary;
exports.parseFileParts = parseFileParts;
