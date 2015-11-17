'use strict';

var utils = require('../utils');
var _ = utils._;
var Promise = utils.Promise;
var ms = require('ms');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var awspublish = require('gulp-awspublish');
var gulp = require('gulp');
var rename = require('gulp-rename');
var imageResize = require('gulp-image-resize');
var path = require('path');

function createOptions(options) {
	options = _.clone(options || {});
	options.action = options.action || 'upload';
	options.action = options.action === 'publish' ? 'upload' : options.action;
	options.time = options.time || '1d';
	options.time = ms(options.time);

	return options;
}

function hasChanged(options, stream, cb, sourceFile) {
	// console.log('file', targetPath, file.stat);
	if (sourceFile.stat.ctime > Date.now() - options.time) {
		stream.push(sourceFile);
	}
	cb();
}

function uploadImages(options, publisher, headers) {
	return new Promise(function(resolve, reject) {
		gulp.src(path.join(__dirname, '../../data/media/**/*.{jpg,png}'))
			.pipe(changed('./data/media', {
				hasChanged: hasChanged.bind(null, options)
			}))
			.pipe(imagemin({
				progressive: true,
				optimizationLevel: 5
			}))
			.pipe(rename(function(path) {
				path.dirname = '/media/' + path.dirname;
			}))
			.pipe(publisher.publish(headers))
			// .pipe(publisher.cache())
			.pipe(awspublish.reporter())
			.on('end', resolve)
			.on('error', reject);
	});
}

function uploadResizedImages(options, publisher, headers, resizeOptions, sizeName) {
	return new Promise(function(resolve, reject) {
		gulp.src(path.join(__dirname, '../../data/media/**/*.{jpg,png}'))
			.pipe(changed('./data/media', {
				hasChanged: hasChanged.bind(null, options)
			}))
			.pipe(imageResize(resizeOptions))
			.pipe(imagemin({
				progressive: true,
				optimizationLevel: 5
			}))
			.pipe(rename(function(path) {
				path.dirname = '/media/' + path.dirname;
				path.basename += '_' + sizeName;
			}))
			.pipe(publisher.publish(headers))
			// .pipe(publisher.cache())
			.pipe(awspublish.reporter())
			.on('end', resolve)
			.on('error', reject);
	});
}

function upload(options) {
	var publisher = awspublish.create({
		params: {
			Bucket: process.env.CDN_BUCKET
		}
	});
	var headers = {
		'Cache-Control': 'max-age=2592000, public'
	};

	var sizes = {
		square: {
			width: 100,
			height: 100,
			crop: true,
			upscale: false
		},
		small: {
			width: 240
		},
		medium: {
			width: 360
		},
		large: {
			width: 520
		}
	};

	return uploadImages(options, publisher, headers)
		.then(function() {
			return Promise.each(Object.keys(sizes), function(size) {
				return uploadResizedImages(options, publisher, headers, sizes[size], size);
			});
		});
}

exports.start = function(options) {
	options = createOptions(options);
	if (options.action === 'upload') {
		return upload(options);
	}
	return Promise.resolve();
};
