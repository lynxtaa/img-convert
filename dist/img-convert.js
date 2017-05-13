'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var exec = function exec() {
	var command = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	return new Promise(function (resolve, reject) {
		require('child_process').exec(command, function (err, data) {
			return err ? reject(err) : resolve(data);
		});
	});
};

var isLinux = require('os').platform() == 'linux';

var ExecParams = function () {
	function ExecParams(params) {
		_classCallCheck(this, ExecParams);

		this.params = params;
	}

	_createClass(ExecParams, [{
		key: 'toString',
		value: function toString() {
			var _this = this;

			return Object.keys(this.params).map(function (param) {
				var val = _this.params[param];
				return val || val === 0 ? '-' + param + ' ' + val : '-' + param;
			}).join(' ');
		}
	}]);

	return ExecParams;
}();

function escapePath(path) {
	if (!path.includes(' ')) {
		return path;
	}
	return isLinux ? path.replace(/\s/g, '\\ ') : '"' + path + '"';
}

function convert(src, target) {
	var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	var execParams = new ExecParams(params);

	var _map = [convert.path, src, target].map(escapePath),
	    _map2 = _slicedToArray(_map, 3),
	    binPath = _map2[0],
	    srcPath = _map2[1],
	    targetPath = _map2[2];

	return exec(binPath + ' ' + srcPath + ' ' + execParams + ' ' + targetPath).then(function () {
		return target;
	});
}

convert.path = isLinux ? 'convert' : 'magick';

module.exports = convert;