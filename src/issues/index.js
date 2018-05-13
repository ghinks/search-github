import constants from '../constants'
import { GraphQLClient } from 'graphql-request'
import { getEnvToken } from '../authentication'

const createQuery = (owner, name, cursor) => {
  console.log(constants)
  const after = cursor ? `, after: ${cursor}` : ''
  const issueQuery = `
  query {
    repository(owner: "${owner}", name: "${name}") {
      id,
      issues(first: ${constants.pageSz}, states: [OPEN] ${after}) {
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
  }`
  return issueQuery
}

const request = async (token, query) => {
  const client = new GraphQLClient(constants.url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const result = await client.request(query)
  console.log(Array(100).join('-'))
  console.log(result)
  return result
}

const getIssues = async (owner, name, cursor) => {
  const token = getEnvToken()
  const query = createQuery(owner, name, cursor)
  const result = await request(token, query)
  return result
}

export { getIssues, createQuery }
