#!/usr/bin/env node
'use strict'

const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const spawn = require('cross-spawn')

const MASTER_JSON = path.join(process.cwd(), 'src/i18n/master.json')

if (!fs.existsSync(MASTER_JSON)) {
  console.log(chalk)
  console.log(chalk.yellow('source data for localization not found!\n'))
  console.log(`rels-i18n requires ${MASTER_JSON} in your project.`)
  console.log('changes to this file are pushed to localeapp as en.yml')

  console.log('If you are adding rels-i18n support to an existing projcect,')
  console.log('please copy your english localizations to this location.')

  process.exit(1)
}

if (!process.env.LOCALEAPP_API_KEY) {
  console.log(chalk.yellow('LOCALEAPP_API_KEY environment variable is not set!\n'))
  console.log('Please export the API key for your project.')
  console.log('You can find the API key in the settings for your project on localeapp.com')
  process.exit(1)
}

function localeappIsInstalled() {
  const installed = spawn.sync('gem', ['list', '-i', 'localeapp'], {
    encoding: 'utf-8',
  })

  if (installed.signal) {
    console.log('computer says no')
    process.exit(1)
  }

  if (installed.status !== 0) {
    console.log(chalk.red('error occurred while looking for the localeapp gem'))
    return false
  }

  return installed.stdout.trim() === 'true'
}

if (!localeappIsInstalled()) {
  console.log(chalk.yellow('localeapp gem not found!\n'))
  console.log('try `gem install localeapp`')
  process.exit(1)
}

const update = spawn.sync(`ruby ${path.join(__dirname, 'i18n.rb')}`, {
  shell: true,
})

if (update.signal) {
  console.log('computer says no')
  process.exit(1)
}

if (update.status !== 0) {
  process.exit(update.status)
}
