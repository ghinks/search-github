const { GraphQLClient } = require('graphql-request')

const url = 'https://api.github.com/graphql'
const gitHubToken = '57cac615ac72ce8487999babb98322befb29a1e5'
const client = new GraphQLClient(url, {
  headers: {
    Authorization: `Bearer ${gitHubToken}`,
  },
})
const query = `{
  viewer {
    login
    name
  }
}`

client.request(query).then(data => console.log(JSON.stringify(data, null, 2)))
