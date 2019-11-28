'use strict'

var assert = require('assert'),
  i18n = require('../../lib/rels-i18n')

describe('i18n', function() {
  before(function() {
    i18n.addLocaleData({
      en: {
        greeting: 'Hello!',
      },
      jp: {
        greeting: 'こんにちは!',
      },
    })
  })
  describe('t', function() {
    describe('default locale', function() {
      it('handles basic string values', function() {
        expect(i18n.t('greeting')).to.eql('Hello!')
      })
    })

    describe('different locale', function() {
      before(function() {
        i18n.setLocale('jp')
      })

      it('handles basic string values', function() {
        expect(i18n.t('greeting')).to.eql('こんにちは!')
      })
    })
  })

  describe('adding to the existing translcations', function() {
    before(function() {
      i18n.setLocale('en')

      i18n.addLocaleData({
        en: {
          ask_name: 'What is your name?',
        },
      })

      i18n.addLocaleData({
        en: {
          compliment: 'You are awesome!',
        },
      })
    })

    it('contains all added translations', function() {
      expect(i18n.t('compliment')).to.eql('You are awesome!')
      expect(i18n.t('ask_name')).to.eql('What is your name?')
    })
  })
})
