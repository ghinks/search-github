'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnvToken = exports.getConfigToken = exports.default = undefined;

var _parseGitConfig = require('parse-git-config');

var _parseGitConfig2 = _interopRequireDefault(_parseGitConfig);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getEnvToken = () => process.env.GITHUB_TOKEN;

const getConfigToken = () => {
  const config = _parseGitConfig2.default.sync({
    path: `${_os2.default.homedir()}/.gitconfig`
  });
  if ((0, _lodash2.default)(config, 'github-search.token')) {
    return config['github-search'].token;
  }
  return undefined;
};

const getToken = () => {
  return getEnvToken() || getConfigToken();
};

exports.default = getToken;
exports.getConfigToken = getConfigToken;
exports.getEnvToken = getEnvToken;