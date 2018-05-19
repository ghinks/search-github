import { table } from 'table'
import moment from 'moment'

const output = (nodes) => {
  let data = nodes.map(node => [node.number, moment.duration(moment.utc(node.publishedAt).diff(moment())).humanize(), node.title])
  data = [['Issue #', 'when', 'Title'], ...data]
  return table(data)
}

export default output
