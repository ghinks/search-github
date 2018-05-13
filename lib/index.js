'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _issues = require('./issues');

const search = (owner, name, searchTerms) => (0, _issues.getIssues)(owner, name, searchTerms);

exports.default = search;