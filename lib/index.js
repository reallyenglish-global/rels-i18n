/*
 * Proxy for https://github.com/fnando/i18n-js/blob/master/app/assets/javascripts/i18n.js right now
 * i18n-js handles the Rails translations but does not have a stand-alone JS module
 *
 * For now, any changes can just be copied into backends/i18n-js straight from the repo - we could
 * also consider copying the code and modifying our own version
 */
var Backend = require('./backends/i18n-js')
var $ = require('jquery')

var i18n = {
  addLocaleData(data) {
    $.extend(true, Backend.translations, data)
  },

  start(options) {
    this.setLocale(options.locale || 'en')
    this.setLocaleData(options.translations)
  },

  setLocale(locale) {
    Backend.locale = locale
  },

  setLocaleData(data) {
    Backend.translations = data
  },

  t(key, params) {
    return Backend.t(key, params)
  },

  l(key, params) {
    return Backend.t(key, params)
  },

  strftime(date, format) {
    return Backend.strftime(date, format)
  },
}

Backend.fallbacks = true
module.exports = i18n
