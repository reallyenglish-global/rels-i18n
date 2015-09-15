'use strict';

var _localeData = {};
var _locale = 'en';

var i18n = {
  setLocale: function(locale) {
    _locale = locale
  },

  setLocaleData: function(data) {
    _localeData = data;
  },

  t: function(key, params) {
    return _localeData[_locale][key];
  }
}

module.exports = i18n;
