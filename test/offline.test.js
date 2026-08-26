const { afterEach, beforeEach, describe, it } = require('node:test')
;('use strict')

const assert = require('assert')
const fs = require('fs')
const os = require('os')
const path = require('path')

const writeJson = (filePath, value) =>
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)

describe('offline locale generation', () => {
  let tempDir
  let previousCwd

  beforeEach(() => {
    previousCwd = process.cwd()
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rels-i18n-offline-'))
    fs.mkdirSync(path.join(tempDir, 'src', 'i18n'), { recursive: true })
    writeJson(path.join(tempDir, 'package.json'), { name: 'sample-package' })
    writeJson(path.join(tempDir, 'src', 'i18n', 'master.json'), {
      en: { 'sample-package': { greeting: 'Hello %{name}' } },
    })
    writeJson(path.join(tempDir, 'src', 'i18n', 'en.json'), {
      en: { 'sample-package': { greeting: 'Hello %{name}' } },
    })
    writeJson(path.join(tempDir, 'src', 'i18n', 'zh-CN.json'), {
      'zh-CN': { 'sample-package': { greeting: '你好 %{name}' } },
    })
    process.chdir(tempDir)
    delete require.cache[require.resolve('../scripts/offline')]
  })

  afterEach(() => {
    process.chdir(previousCwd)
    fs.rmSync(tempDir, { recursive: true, force: true })
  })

  it('generates and validates locale modules without credentials', () => {
    const { generate } = require('../scripts/offline')

    generate()
    assert.match(fs.readFileSync(path.join(tempDir, 'src/i18n/index.js'), 'utf8'), /zhCN/)
    assert.match(generate({ checkOnly: true }), /check passed/)
  })

  it('rejects colliding locale identifiers', () => {
    writeJson(path.join(tempDir, 'src/i18n', 'zh_CN.json'), {
      zh_CN: { 'sample-package': { greeting: '你好' } },
    })
    const { generate } = require('../scripts/offline')

    assert.throws(() => generate(), /locale identifiers collide/)
  })
})
