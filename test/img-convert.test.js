const fs = require('fs')
const {expect} = require('chai')
const {join} = require('path')
const imgConvert = require('../lib/img-convert')

const getPath = (...paths) => join(__dirname, 'images', ...paths)

const remove = path => new Promise((resolve, reject) => {
	fs.unlink(path, err => err ? reject(err) : resolve())
})

const cleanUp = (filePath, callback) => [
	() => remove(filePath).then(callback).catch(callback),
	err => remove(filePath).then(() => callback(err)).catch(callback),
]

describe('Test converting', () => {
	it('converts file', done => {
		const targetPath = getPath('npm.gif')

		imgConvert(getPath('npm.svg'), targetPath)
			.then(() => {
				const exists = fs.existsSync(targetPath)
				expect(exists).to.be.true
			})
			.then(...cleanUp(targetPath, done))
	})

	it('returns converted file path', done => {
		const targetPath = getPath('npm.png')

		imgConvert(getPath('npm.svg'), targetPath)
			.then(result => {
				expect(result).to.equal(targetPath)
			})
			.then(...cleanUp(targetPath, done))
	})

	it('resolves spaces in path', done => {
		const targetPath = getPath('folder with spaces', 'npm.gif')

		imgConvert(getPath('npm.svg'), targetPath)
			.then(() => {
				const exists = fs.existsSync(targetPath)
				expect(exists).to.be.true
			})
			.then(...cleanUp(targetPath, done))
	})
})
