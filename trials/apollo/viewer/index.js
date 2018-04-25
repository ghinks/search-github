const chalk = require('chalk')
const {ApolloClient} = require('apollo-client-preset')
const {createHttpLink} = require('apollo-link-http')
const {InMemoryCache} = require('apollo-cache-inmemory')
const gql = require('graphql-tag')
const fetch = require('isomorphic-fetch')

const githubToken = '57cac615ac72ce8487999babb98322befb29a1e5'
const url = 'https://api.github.com/graphql'

console.log(Array(50).join('-'))
console.log(chalk.blue('try apollo'))
console.log(Array(50).join('-'))

const headers = {
  authorization: `Bearer ${githubToken}`
}

const link = createHttpLink({ uri: url, fetch, headers })

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

client.query({
  query: gql`
    query {
      viewer {
        login
        name
      }
    }
  `
})
  .then(data => console.log(data))
  .catch(error => console.error(error))
