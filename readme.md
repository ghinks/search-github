# Github Search

A package that provides an API to query the github graph interface.

## Authentication
This package requires an authentication token for github. Please follow
this link to get one [get github authorization token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

The authentication token may be passed to the module, read from the environment
or configuration file.

Initial the local environment variable GITHUB_TOKEN must be exported to provide access to github.


```
export GITHUB_TOKEN = 'smp12mupibtrxrmozlmvxbyrvb4iwszmzjnwkaee'
```

or

```
git config --global github-search.token 'smp12mupibtrxrmozlmvxbyrvb4iwszmzjnwkaee'
```

## Motivation
I want to be able to search for issues in a github repo and bring back all the issues on the command line and filter them in the console without going to the search tool in the  browser.

### features
- useful cli
- caching

## Current work list
- command line args for query
- use as a module in another program
- recursively get all the open issues
- search closed issues too


## References

- [github developer v4](https://developer.github.com/v4/)
- [graphql ref impl](https://github.com/graphql/graphql-js)
- [explorer](https://developer.github.com/v4/explorer/)
- [learn](http://graphql.org/learn/)