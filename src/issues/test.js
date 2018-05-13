import { getIssues } from './index'
import nock from 'nock'

describe('issue queries', () => {
  describe('passing', () => {
    beforeAll(() => {

    })

    beforeEach(() => {
      nock(/.*/)
        .post(/.*/)
        .reply(200, {})
    })
    test('An initial request should fetch data', async () => {
      expect.assertions(1)
      const owner = 'bob'
      const name = 'bobs-special-code'
      const result = await getIssues(owner, name)
      expect(result).toMatchSnapshot()
    })

    test('A subsequential request should fetch data', async () => {
      expect.assertions(1)
      const owner = 'bob'
      const name = 'bobs-special-code'
      const cursor = 'cursor'
      const result = await getIssues(owner, name, cursor)
      expect(result).toMatchSnapshot()
    })
  })
})
