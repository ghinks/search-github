import { getIssues } from './issues'
import filter from './search'
import ora from 'ora'

const search = (owner, name, searchTerms) => {
  const spinner = ora('Scanning repo').start()
  getIssues(owner, name, searchTerms)
    .then(nodes => {
      console.log(`num open issues ${nodes.length}`)
      return filter(nodes, searchTerms)
    })
    .then((matches) => {
      console.log(`num matches = ${matches.length}`)
      matches.forEach(m => console.log(m.body))
      spinner.stop()
    })
    .catch(err => console.log(err.message))
}

export default search
