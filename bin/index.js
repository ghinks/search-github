#!/usr/bin/env node

var search = require('../lib/index').default

search().then(() => console.log('over'))
