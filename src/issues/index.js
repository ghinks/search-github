import { url, pageSz } from '../constants'
import { GraphQLClient } from 'graphql-request'
import { getEnvToken } from '../authentication'

const issueQuery = `

`
const getIssues = (owner, name, cursor) => {
  const token = getEnvToken()
}

export { getIssues }
