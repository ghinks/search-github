import { getIssues } from './issues'
import filter from './search'
import ora from 'ora'
import { table } from 'table'
import moment from 'moment'

const output = (nodes) => {
  let data = nodes.map(node => [node.number, moment.duration(moment.utc(node.publishedAt).diff(moment())).humanize(), node.title])
  data = [['Issue #', 'when', 'Title'], ...data]
  const output = table(data)
  console.log(output)
}

const search = (owner, name, searchTerms) => {
  const spinner = ora('Scanning repo').start()
  getIssues(owner, name, searchTerms)
    .then(openNodes => {
      console.log(`num open issues ${openNodes.length}`)
      return filter(openNodes, searchTerms)
    })
    .then((matchingNodes) => {
      console.log(`num matches = ${matchingNodes.length}`)
      output(matchingNodes)
      spinner.stop()
    })
    .catch(err => console.log(err.message))
}

export default search
