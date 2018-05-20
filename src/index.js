import { getIssues } from './issues'
import filter from './search'
import ora from 'ora'
import format from './format'
import githubUrl from './githubUrl'

const search = (owner, name, searchTerms) => {
  const spinner = ora('Scanning repo').start()
  getIssues(owner, name, searchTerms)
    .then(openNodes => {
      console.log(`num open issues ${openNodes.length}`)
      return filter(openNodes, searchTerms)
    })
    .then((matchingNodes) => {
      console.log(`num matches = ${matchingNodes.length}`)
      console.log(`${format(matchingNodes)}`)
      spinner.stop()
    })
    .catch(err => console.log(err.message))
}

export { search as default, getIssues, filter, githubUrl }
