import constants from '../constants'
import { GraphQLClient } from 'graphql-request'
import getToken from '../authentication'

const createQuery = (owner, name, cursor) => {
  const after = cursor ? `, after: "${cursor}"` : ''
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

const pagedRequest = async (results, token, owner, name, searchTerms, cursor) => {
  const query = createQuery(owner, name, cursor)
  let result = await request(token, query)
  console.log(result)
  result.repository.issues.nodes.forEach(n => results.push(n))
  console.log(results.length)
  if (result.repository.issues.pageInfo.hasNextPage) {
    return pagedRequest(results, token, owner, name, searchTerms, result.repository.issues.pageInfo.endCursor)
  }
  return results
}

const getIssues = async (owner, name, searchTerms) => {
  const token = getToken()
  const query = createQuery(owner, name)
  let result = await request(token, query)
  let results = result.repository.issues.nodes
  if (result.repository.issues.pageInfo.hasNextPage) {
    return pagedRequest(results, token, owner, name, searchTerms, result.repository.issues.pageInfo.endCursor)
  }
  return results
}

export { getIssues, createQuery, request }
