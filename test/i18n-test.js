'use strict';

var assert = require("assert"),
    i18n = require("../lib/rels-i18n");

describe("i18n", function() {
  before(function() {
    i18n.setLocaleData({
      'en': {
        'greeting': 'Hello!'
      }
    });
  });
  describe("t", function() {
    describe("default locale", function() {
      it("handles basic string values", function() {
        assert.equal("Hello!", i18n.t("greeting"));
      });
    });
  });
});

