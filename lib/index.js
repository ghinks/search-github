'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _issues = require('./issues');

const search = () => (0, _issues.getIssues)('expressjs', 'express', undefined);

exports.default = search;