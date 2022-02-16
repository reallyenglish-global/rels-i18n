let locale, output
const en = {
  en: {
    test: 'test',
  },
}

const ja_JP = {
  ja_JP: {
    test: 'テスト',
  },
}

;(function () {
  locale = document.querySelector('#locale')
  output = document.querySelector('#output')

  locale.addEventListener('change', () => {
    window.i18n.setLocale(locale.value)
    output.innerHTML = window.i18n.t('test')
  })

  window.onload = () => {
    window.i18n.addLocaleData(en)
    window.i18n.addLocaleData(ja_JP)
    output.innerHTML = window.i18n.t('test')
  }
})()
