import { getIssues } from './issues'
import filter from './search'
import ora from 'ora'
import { table } from 'table'

const search = (owner, name, searchTerms) => {
  const spinner = ora('Scanning repo').start()
  getIssues(owner, name, searchTerms)
    .then(nodes => {
      console.log(`num open issues ${nodes.length}`)
      return filter(nodes, searchTerms)
    })
    .then((matches) => {
      console.log(`num matches = ${matches.length}`)
      let data = matches.map(match => [match.number, match.title])
      data = [['Number', 'Title'], ...data]
      const output = table(data)
      console.log(output)
      spinner.stop()
    })
    .catch(err => console.log(err.message))
}

export default search
