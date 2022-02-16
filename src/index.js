/*
 * Proxy for https://github.com/fnando/i18n-js/blob/master/app/assets/javascripts/i18n.js right now
 * i18n-js handles the Rails translations but does not have a stand-alone JS module
 *
 * For now, any changes can just be copied into backends/i18n-js straight from the repo - we could
 * also consider copying the code and modifying our own version
 */
const Backend = require('./backends/i18n-js')

const i18n = {
  addLocaleData(data) {
    const { translations } = Backend
    Object.keys(data).forEach((incomingKey) => {
      translations[incomingKey] = Object.assign(translations[incomingKey] || {}, data[incomingKey])
    })
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

  strftimeWithoutTimezone(date, format) {
    const tzo = date.getTimezoneOffset() * 1000 * 60
    return Backend.strftime(new Date(date / 1 + tzo), format)
  },
}

Backend.fallbacks = true
export default i18n
if (process.env && process.env.NODE_ENV === 'development') {
  window.i18n = i18n
}
