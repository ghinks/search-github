const { GraphQLClient } = require('graphql-request')

const url = 'https://api.github.com/graphql'
const gitHubToken = '57cac615ac72ce8487999babb98322befb29a1e5'
const client = new GraphQLClient(url, {
  headers: {
    Authorization: `Bearer ${gitHubToken}`,
  },
})
const query = `{
  repository(owner: "expressjs", name: "express") {
    id,
    issues(last: 10, states: [OPEN]) {
      totalCount,
      nodes {
        author {
          login
        }
        publishedAt,
        id,
        body
      }
    }
  }
}`

client.request(query).then(data => console.log(JSON.stringify(data, null, 2)))
