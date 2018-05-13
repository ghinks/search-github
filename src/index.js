import { getIssues } from './issues'

const search = () => getIssues('expressjs', 'express', undefined)

export default search
