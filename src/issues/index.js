import constants from '../constants'
import { GraphQLClient } from 'graphql-request'
import getToken from '../authentication'

const createQuery = (owner, name, cursor) => {
  const after = cursor ? `, after: ${cursor}` : ''
  const issueQuery = `
  query {
    repository(owner: "${owner}", name: "${name}") {
      id,
      issues(first: ${constants.pageSz}, states: [OPEN] , orderBy: { field: CREATED_AT, direction: DESC } ${after}) {
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
  return client.request(query)
}

const getIssues = async (owner, name, searchTerms, cursor) => {
  const token = getToken()
  const query = createQuery(owner, name, cursor)
  return request(token, query)
}

export { getIssues, createQuery, request }
