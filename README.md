# RELS i18n
[![Build Status](https://travis-ci.com/reallyenglish/rels-i18n.svg?token=nQpkqttSTJftx5LczSUb&branch=master)](https://travis-ci.com/reallyenglish/rels-web)

Proof of concept for Rails i18n -> JS i18n

## Proposal

* Used by all rels-* libraries for displaying text
* Supports Rails-style keys ("lesson.continue")
* Potentially handoff actual parsing to existing i18n backend library

## Setup

```javascript
var i18n = require("rels-i18n");


i18n.addLocaleData({
  'en': {
    'continue': 'Continue',
    'homepage': {
      'greeting': 'Hello, %{name}!',
      'inbox': {
        'one': 'message',
        'other': 'messages'
      }
    }
  }
});
```
## Usage

```javascript
var i18n = require("rels-i18n");

i18n.t("continue");
i18n.t("homepage.greeting", {name: "Stephen"});
i18n.t("homepage.inbox", {count: 1});
```

To set a different language use:

```
i18.setLocale('ja')
```
