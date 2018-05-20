'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = require('url');

const parseGithubUrl = url => {
  let githubUrl;
  try {
    githubUrl = new _url.URL(url);
    const [owner, name] = githubUrl.pathname.slice(1).split('/');
    if (!owner || !name) return undefined;
    return {
      owner,
      name
    };
  } catch (err) {
    // take no action
    // return undefined
  }
};

exports.default = parseGithubUrl;