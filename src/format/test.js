import format from './index'
import fsp from 'fs/promises'

describe('format', () => {
  let nodes
  beforeAll((done) => {
    fsp.readFile(`${__dirname}/test.data.json`, 'utf8')
      .then((testData) => {
        nodes = JSON.parse(testData)['nodes']
        done()
      })
  })
  test('expect formated output', () => {
    expect(format(nodes)).toMatchSnapshot()
  })
})
