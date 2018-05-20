'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.githubUrl = exports.filter = exports.getIssues = exports.default = undefined;

var _issues = require('./issues');

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _format = require('./format');

var _format2 = _interopRequireDefault(_format);

var _githubUrl = require('./githubUrl');

var _githubUrl2 = _interopRequireDefault(_githubUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const search = (owner, name, searchTerms) => {
  const spinner = (0, _ora2.default)('Scanning repo').start();
  (0, _issues.getIssues)(owner, name, searchTerms).then(openNodes => {
    console.log(`num open issues ${openNodes.length}`);
    return (0, _search2.default)(openNodes, searchTerms);
  }).then(matchingNodes => {
    console.log(`num matches = ${matchingNodes.length}`);
    console.log(`${(0, _format2.default)(matchingNodes)}`);
    spinner.stop();
  }).catch(err => console.log(err.message));
};

exports.default = search;
exports.getIssues = _issues.getIssues;
exports.filter = _search2.default;
exports.githubUrl = _githubUrl2.default;