import { table } from 'table'
import moment from 'moment'

const output = (nodes) => {
  let data = nodes.map(node => [node.number, moment.duration(moment.utc(node.publishedAt).diff(moment())).humanize(), node.title])
  data = [['Issue #', 'when', 'Title'], ...data]
  const config = {
    columns: {
      2: {
        width: 70,
        truncate: 100
      }
    }
  };
  return table(data, config)
}

export default output
