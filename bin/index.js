#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
var lib = require('../lib/index')
var search = lib.default
var githubUrl = lib.githubUrl

if (argv._[0] && githubUrl(argv._[0])) {
  var repoData = githubUrl(argv._[0])
  search(repoData.owner, repoData.name, argv._.slice(1) || argv._[1])
}
else if (argv._.length < 3) {
  console.log('wrong number of args given args given')
  console.log('owner name searchTerm(s) or url searchTerm(s)')
  console.log('example expressjs express undefined')
  process.exit()
}
else {
  search(argv._[0], argv._[1], argv._.slice(2) || argv._[2])
}
