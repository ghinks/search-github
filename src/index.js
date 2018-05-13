import { getIssues } from './issues'

const search = (owner, name, searchTerms) => getIssues(owner, name, searchTerms)

export default search
