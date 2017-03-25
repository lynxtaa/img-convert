const exec = (command='') => new Promise((resolve, reject) => {
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

function convert(src, target, params={}) {
	const execParams = new ExecParams(params)
	const binPath = convert.path.includes(' ') ? `"${convert.path}"` : convert.path
	return exec(`${binPath} "${src}" ${execParams} "${target}"`).then(() => target)
}

convert.path = require('os').platform() == 'linux' ? 'convert' : 'magick'

module.exports = convert
