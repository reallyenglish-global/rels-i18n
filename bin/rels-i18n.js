#!/usr/bin/env node
'use strict'

const spawnSync = require('child_process').spawnSync

const SCRIPTS = ['update', 'check', 'generate']
const args = process.argv.slice(2)

const index = args.findIndex((arg) => SCRIPTS.includes(arg))
const task = args[index]

if (!task) {
  console.log(`rels-i18n does not support '${args[0]}'`)
  process.exit(1)
}

const script = task === 'update' ? '../scripts/update' : '../scripts/offline'
args.splice(index, 1, require.resolve(script))
const childProcess = spawnSync(process.execPath, args, { stdio: 'inherit' })

if (childProcess.signal) {
  console.log('computer says no')
  process.exit(1)
}

process.exit(childProcess.status)
