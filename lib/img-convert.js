'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var promisify = function promisify(fn) {
	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return new Promise(function (resolve, reject) {
			args.push(function (err, data) {
				return err ? reject(err) : resolve(data);
			});
			fn.apply(undefined, args);
		});
	};
};

var exec = promisify(require('child_process').exec);

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

module.exports = function (src, target) {
	var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	var execParams = new ExecParams(params);
	return exec(exports.path + ' ' + src + ' ' + execParams + ' ' + target).then(function () {
		return target;
	});
};

exports.path = require('os').platform() == 'linux' ? 'convert' : 'magick';