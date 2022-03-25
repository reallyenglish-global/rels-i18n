# RELS i18n

[![Build Status](https://travis-ci.com/reallyenglish-global/rels-i18n.svg?token=nQpkqttSTJftx5LczSUb&branch=master)](https://travis-ci.com/reallyenglish/rels-i18n)

Localeapp localizations for javascript.

This library combines i18n-js and Localeapp workflows to automate management and consumption of
internationalization data.

# Requirements

rels-i18n is pretty opinionated about how your locale data is managed and how your project is
structured. If you can follow the following two rules, localization will just 'work'

- A Localeapp project and the API key for your project exported to LOCALEAPP_API_KEY. You can find
  the key in the setting area of your project on localeapp.com

- A `master.json` file stored at 'src/i18n/master.json' This file must have a top level key of "en"
  followed by a key that matches the name of your package as per package.json. This is where you add
  new keys and update English strings.

```
{
  "en": {
    "pacakge-name": {
      "my-key": "hi there!"
      "my-other-key": "I like %{flavor} ice cream!"
    }
  }
}
```

## Updating locale data

In order to update locals `npm exec -- rels-i18n update`

This will push up any changes you made to master.json since the last update and pull down any new
localizations. json data and a new service object are created under src/i18n - however the only file
you should ever be editing is `master.json`. This process is additive. key removal must be done
manually both remotely on Localeapp and localally in your master.json

## Consuming locale data

### configure locale

```javascript
/* assuming you have some settings object that manages the locale you will need to do this somewhere */
import i18n from './locales'
i18n.configure({ locale: 'zh-CN' })
```

### Pulling translations

```javascript
// basic translation
console.log(i18n.t('my-key'))

// basic translation with interpolation
console.log(i18n.t('my-other-key'), { flavor: 'banana' })
```

### Other

`strftime` and `strftimeWithoutTimezone` are also available.
