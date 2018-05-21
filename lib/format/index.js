'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _table = require('table');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const output = nodes => {
  let data = nodes.map(node => [node.number, _moment2.default.duration(_moment2.default.utc(node.publishedAt).diff((0, _moment2.default)())).humanize(), node.title]);
  data = [['Issue #', 'when', 'Title'], ...data];
  const config = {
    columns: {
      2: {
        width: 70,
        truncate: 100
      }
    }
  };
  return (0, _table.table)(data, config);
};

exports.default = output;