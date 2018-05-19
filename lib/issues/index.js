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
  const after = cursor ? `, after: "${cursor}"` : '';
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
          title,
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

const pagedRequest = (() => {
  var _ref2 = (0, _asyncToGenerator3.default)(function* (results, token, owner, name, searchTerms, cursor) {
    const query = createQuery(owner, name, cursor);
    let result = yield request(token, query);
    result.repository.issues.nodes.forEach(function (n) {
      return results.push(n);
    });
    if (result.repository.issues.pageInfo.hasNextPage) {
      return pagedRequest(results, token, owner, name, searchTerms, result.repository.issues.pageInfo.endCursor);
    }
    return results;
  });

  return function pagedRequest(_x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
})();

const getIssues = (() => {
  var _ref3 = (0, _asyncToGenerator3.default)(function* (owner, name, searchTerms) {
    const token = (0, _authentication2.default)();
    const query = createQuery(owner, name);
    let result = yield request(token, query);
    let results = result.repository.issues.nodes;
    if (result.repository.issues.pageInfo.hasNextPage) {
      return pagedRequest(results, token, owner, name, searchTerms, result.repository.issues.pageInfo.endCursor);
    }
    return results;
  });

  return function getIssues(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
})();

exports.getIssues = getIssues;
exports.createQuery = createQuery;
exports.request = request;