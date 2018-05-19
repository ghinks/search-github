'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _issues = require('./issues');

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _table = require('table');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const output = nodes => {
  let data = nodes.map(node => [node.number, _moment2.default.duration(_moment2.default.utc(node.publishedAt).diff((0, _moment2.default)())).humanize(), node.title]);
  data = [['Issue #', 'when', 'Title'], ...data];
  const output = (0, _table.table)(data);
  console.log(output);
};

const search = (owner, name, searchTerms) => {
  const spinner = (0, _ora2.default)('Scanning repo').start();
  (0, _issues.getIssues)(owner, name, searchTerms).then(openNodes => {
    console.log(`num open issues ${openNodes.length}`);
    return (0, _search2.default)(openNodes, searchTerms);
  }).then(matchingNodes => {
    console.log(`num matches = ${matchingNodes.length}`);
    output(matchingNodes);
    spinner.stop();
  }).catch(err => console.log(err.message));
};

exports.default = search;