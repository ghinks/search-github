import format from './index'
import fsp from 'fs/promises'
import moment from 'moment'

describe('format', () => {
  let nodes

  const setPublishedAt = () => new Date(moment().subtract(7, 'days'))

  beforeAll((done) => {
    fsp.readFile(`${__dirname}/test.data.json`, 'utf8')
      .then((testData) => {
        nodes = JSON.parse(testData)['nodes']
        nodes[0].publishedAt = setPublishedAt()
        done()
      })
  })
  test('expect formated output', () => {
    expect(format(nodes)).toMatchSnapshot()
  })
})
