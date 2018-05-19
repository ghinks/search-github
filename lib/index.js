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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const search = (owner, name, searchTerms) => {
  const spinner = (0, _ora2.default)('Scanning repo').start();
  (0, _issues.getIssues)(owner, name, searchTerms).then(nodes => {
    console.log(`num open issues ${nodes.length}`);
    return (0, _search2.default)(nodes, searchTerms);
  }).then(matches => {
    console.log(`num matches = ${matches.length}`);
    let data = matches.map(match => [match.number, match.title]);
    data = [['Number', 'Title'], ...data];
    const output = (0, _table.table)(data);
    console.log(output);
    spinner.stop();
  }).catch(err => console.log(err.message));
};

exports.default = search;