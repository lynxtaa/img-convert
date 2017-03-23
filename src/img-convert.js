const promisify = fn => (...args) => new Promise((resolve, reject) => {
	args.push((err, data) => err ? reject(err) : resolve(data))
	fn(...args)
})

const exec = promisify(require('child_process').exec)

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
	return exec(`${exports.path} ${src} ${execParams} ${target}`).then(() => target)
}

exports.path = require('os').platform() == 'linux' ? 'convert' : 'magick'
