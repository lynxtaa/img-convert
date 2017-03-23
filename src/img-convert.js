const exec = command => new Promise((resolve, reject) => {
	require('child_process').exec(command, (err, data) => err ? reject(err) : resolve(data))
})

class ExecParams {
	constructor(params) {
		this.params = params
	}
	toString() {
		return Object.keys(this.params).map(param => {
			const val = this.params[param]
			return val || val === 0 ? `-${param} ${val}` : `-${param}`
		}).join(' ')
	}
}

module.exports = function(src, target, params={}) {
	const execParams = new ExecParams(params)
	const binPath = exports.path.includes(' ') ? `"${exports.path}"` : exports.path
	return exec(`${binPath} "${src}" ${execParams} "${target}"`).then(() => target)
}

exports.path = require('os').platform() == 'linux' ? 'convert' : 'magick'
