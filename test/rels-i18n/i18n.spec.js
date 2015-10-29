'use strict';

var assert = require('assert'),
    i18n = require('../../lib/rels-i18n');

describe('i18n', function() {
  before(function() {
    i18n.addLocaleData({
      'en': {
        'greeting': 'Hello!'
      },
      'jp': {
        'greeting': 'こんにちは!'
      }
    });
  });
  describe('t', function() {
    describe('default locale', function() {
      it('handles basic string values', function() {
        assert.equal('Hello!', i18n.t('greeting'));
      });
    });

    describe('different locale', function() {
      before(function() {
        i18n.setLocale('jp');
      });

      it('handles basic string values', function() {
        assert.equal('こんにちは!', i18n.t('greeting'));
      });
    });
  });

  describe('adding to the existing translcations', function() {
    before(function() {
      i18n.setLocale('en');

      i18n.addLocaleData({
        'en': {
          'ask_name': 'What is your name?'
        }
      });

      i18n.addLocaleData({
        'en': {
          'compliment': 'You are awesome!'
        }
      });
    });

    it('adds', function() {
      assert.equal('You are awesome!', i18n.t('compliment'));
      assert.equal('What is your name?', i18n.t('ask_name'));
    });
  });
});

