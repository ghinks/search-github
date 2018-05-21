import constants from '../constants'
import { GraphQLClient } from 'graphql-request'
import getToken from '../authentication'

const createQuery = (owner, name, cursor, states = 'OPEN') => {
  const after = cursor ? `, after: "${cursor}"` : ''
  const issueQuery = `
  query {
    repository(owner: "${owner}", name: "${name}") {
      id,
      url,
      issues(first: ${constants.pageSz}, states: [${states}] , orderBy: { field: CREATED_AT, direction: DESC } ${after}) {
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

const pagedRequest = async (results, token, owner, name, searchTerms, cursor) => {
  const query = createQuery(owner, name, cursor)
  let result = await request(token, query)
  result.repository.issues.nodes.forEach(n => results.push(n))
  if (result.repository.issues.pageInfo.hasNextPage) {
    return pagedRequest(results, token, owner, name, searchTerms, result.repository.issues.pageInfo.endCursor)
  }
  return results
}

const getIssues = async (owner, name, searchTerms, states) => {
  const token = getToken()
  const query = createQuery(owner, name, states)
  let result = await request(token, query)
  let results = result.repository.issues.nodes
  if (result.repository.issues.pageInfo.hasNextPage) {
    return pagedRequest(results, token, owner, name, searchTerms, result.repository.issues.pageInfo.endCursor)
  }
  return results
}

export { getIssues, createQuery, request }
