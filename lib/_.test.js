import i18n from '.'

describe('i18n', () => {
  before(() => {
    i18n.addLocaleData({
      en: {
        greeting: 'Hello!',
      },
      jp: {
        greeting: 'こんにちは!',
      },
    })
  })
  describe('t', () => {
    describe('default locale', () => {
      it('handles basic string values', () => {
        expect(i18n.t('greeting')).to.eql('Hello!')
      })
    })

    describe('different locale', () => {
      it('handles basic string values', () => {
        i18n.setLocale('jp')
        expect(i18n.t('greeting')).to.eql('こんにちは!')
      })
    })
  })

  describe('adding to the existing translations', () => {
    it('contains all added translations', () => {
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

      expect(i18n.t('compliment')).to.eql('You are awesome!')
      expect(i18n.t('ask_name')).to.eql('What is your name?')
    })
  })
})
