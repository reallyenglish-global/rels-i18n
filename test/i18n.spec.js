'use strict';

var assert = require("assert"),
    i18n = require("../lib/rels-i18n");

var translations = {
  'en': {
    'greeting': 'Hello!'
  },
  'jp': {
    'greeting': 'こんにちは!'
  }
};

describe("i18n", function() {
  before(function() {
    i18n.start({
      locale: 'en',
      translations: translations
    });
  });

  describe("t", function() {

    describe("default locale", function() {
      it("handles basic string values", function() {
        assert.equal("Hello!", i18n.t("greeting"));
      });
    });

    describe("swap locale", function() {
      before(function() {
        i18n.setLocale('jp');
      });

      it("handles basic string values", function() {
        assert.equal("こんにちは!", i18n.t("greeting"));
      });
    });
  });
});

