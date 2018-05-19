#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
var search = require('../lib/index').default

if (argv._.length < 3) {
  console.log('wrong number of args given args given')
  console.log('owner name searchTerm')
  console.log('example expressjs express undefined')
  process.exit()
}

search(argv._[0], argv._[1], argv._.slice(2) || argv._[2])
