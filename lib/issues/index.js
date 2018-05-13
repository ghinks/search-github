'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = exports.createQuery = exports.getIssues = undefined;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _graphqlRequest = require('graphql-request');

var _authentication = require('../authentication');

var _authentication2 = _interopRequireDefault(_authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createQuery = (owner, name, cursor) => {
  const after = cursor ? `, after: ${cursor}` : '';
  const issueQuery = `
  query {
    repository(owner: "${owner}", name: "${name}") {
      id,
      issues(first: ${_constants2.default.pageSz}, states: [OPEN] , orderBy: { field: CREATED_AT, direction: DESC } ${after}) {
        totalCount,
        nodes {
          author {
            login
          }
          publishedAt,
          id,
          body,
          number,
        }
        pageInfo {
          endCursor,
          hasNextPage
        }
      }
    }
  }`;
  return issueQuery;
};

const request = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (token, query) {
    const client = new _graphqlRequest.GraphQLClient(_constants2.default.url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return client.request(query);
  });

  return function request(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const getIssues = (() => {
  var _ref2 = (0, _asyncToGenerator3.default)(function* (owner, name, searchTerms, cursor) {
    const token = (0, _authentication2.default)();
    const query = createQuery(owner, name, cursor);
    return request(token, query);
  });

  return function getIssues(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();

exports.getIssues = getIssues;
exports.createQuery = createQuery;
exports.request = request;