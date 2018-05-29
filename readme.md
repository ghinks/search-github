# Github Search

A package that provides an API and a CLI to query the github graph interface for  open issues matching search term(s). This does require a github token see authentication section.

## module usage

### Command line
When the module is installed globally you can use it directly on the command line. There are two ways to use it one is to provide the github url, the other is to provide the owner and name of the
module on the command line. The following are equivalent.

```
search-github https://github.com/facebook/jest mock
```

and

```
search-github facebook jest mock
```

Multiple search terms and regular expressions are allowed on the command line.

```
search-github https://github.com/facebook/jest '.*mock.*' '.*match.*'
```

The command will bring back all the matches no matter how many there are and you will not have to deal with any pagination.

```
search-github https://github.com/facebook/jest '.*mock.*'
⠸ Scanning reponum open issues 317
num matches = 35
╔═════════╤═══════════╤════════════════════════════════════════════════════════════════════════╗
║ Issue # │ when      │ Title                                                                  ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 6180    │ 9 days    │ Parameterised mock return values                                       ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 6179    │ 9 days    │ globalSetup doesn't process styleMocks / moduleNameMappers             ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 6168    │ 11 days   │ domock is not work after require once.                                 ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 6127    │ 19 days   │ automocking: true is broken                                            ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 6081    │ 25 days   │ RFC: Built-in support for HTTP mocking                                 ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 6071    │ a month   │ Inaccessible mock function instances when performing local mock        ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 6059    │ a month   │ restoreAllMocks does not work correctly when inside a beforeEach, and  ║
║         │           │ restoreMocks option does no...                                         ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 5969    │ a month   │ Mocking a module API pains                                             ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 5962    │ a month   │ Mock implementation not working                                        ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 5896    │ 2 months  │ Jest building runtime can instantiate a module twice when mocks reuse  ║
║         │           │ production utilities.                                                  ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 5830    │ 2 months  │ `requireActual` within a mock breaks `requireActual`                   ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 5805    │ 2 months  │ mock of third-party constructor function contains no instance methods  ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 5792    │ 2 months  │ Bug: Using mock-fs in beforeEach hooks breaks console.log()s           ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 5790    │ 2 months  │ restoreMocks doesn't reset the mocks from the last test if mocking jsd ║
║         │           │ om in a beforeEach                                                     ║
╟─────────┼───────────┼────────────────────────────────────────────────────────────────────────╢
║ 2070    │ 2 years   │ [bug] duplicate manual mock found in separate directories              ║
╚═════════╧═══════════╧════════════════════════════════════════════════════════════════════════╝

```

### Use as a module


## Install

for cli use
```
npm i -g search-github
```

for use as a module
```
npm i -S search-github
```

## Authentication
This package requires an authentication token for github. Please follow
this link to get one [get github authorization token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

The authentication token may be read from the environment or the git configuration file located under

Initial the local environment variable GITHUB_TOKEN must be exported to provide access to github.


```
export GITHUB_TOKEN = 'smp12mupibtrxrmozlmvxbyrvb4iwszmzjnwkaee'
```

or

```
git config --global github-search.token 'smp12mupibtrxrmozlmvxbyrvb4iwszmzjnwkaee'
```

The github graphql interface takes an authentication header with this value and if you want to use the graphql interface you will need to get yourself a token.




## Motivation
I want to be able to search for issues in a github repo and bring back all the issues on the command line and filter them in the console without going to the search tool in the  browser.

### Command line usage

```
screenshot goes here
```

## Current work list
- command line args for query COMPLETED
- recursively get all the open issues COMPLETED
- filter on search term COMPLETED
- add days old / age to table o/p COMPLETED
- use as a module in another program COMPLETED
- take url rather than owner and name COMPLETED
- search closed issues too COMPLETED
- readme update
- no token found open page to get token or print out help, even self created page with the
instructions ?
- small png to show use


## References

- [github developer v4](https://developer.github.com/v4/)
- [graphql ref impl](https://github.com/graphql/graphql-js)
- [explorer](https://developer.github.com/v4/explorer/)
- [learn](http://graphql.org/learn/)