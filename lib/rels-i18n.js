/*
* Proxy for https://github.com/fnando/i18n-js/blob/master/app/assets/javascripts/i18n.js right now
* i18n-js handles the Rails translations but does not have a stand-alone JS module
*
* For now, any changes can just be copied into backends/i18n-js straight from the repo - we could
* also consider copying the code and modifying our own version
*/
'use strict';

var Backend = require("./backends/i18n-js"),
    $ = require('jquery');

var _localeData = {};
var _locale = 'en';

var i18n = {
  addLocaleData: function(data) {
    console.log('add locale data', data, this, Backend);
    $.extend(true, Backend.translations, data, true);
  },

  start: function(options){
    console.log('someone called i18n start!', options, this, Backend);
    this.setLocale(options.locale || 'en');
    this.setLocaleData( options.translations );
  },

  setLocale: function(locale) {
    console.log('set locale', locale, this, Backend);
    Backend.locale = locale;
  },

  setLocaleData: function(data) {
    console.log('someone set locale data, killing everything else', data, this, Backend);
    Backend.translations = data;
  },

  t: function(key, params) {
    return Backend.t(key, params);
  }
}

module.exports = i18n;
