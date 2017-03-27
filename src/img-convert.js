const exec = (command='') => new Promise((resolve, reject) => {
	require('child_process').exec(command, (err, data) => err ? reject(err) : resolve(data))
})

const isLinux = require('os').platform() == 'linux'

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

function escapePath(path) {
	if (!path.includes(' ')) {
		return path
	}
	return isLinux ? path.replace(/\s/g, '\\ ') : `"${path}"`
}

function convert(src, target, params={}) {
	const execParams = new ExecParams(params)
	const [binPath, srcPath, targetPath] = [convert.path, src, target].map(escapePath)
	return exec(`${binPath} ${srcPath} ${execParams} ${targetPath}`).then(() => target)
}

convert.path = isLinux ? 'convert' : 'magick'

module.exports = convert
