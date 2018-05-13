import { getIssues, createQuery } from './index'
import nock from 'nock'

describe('issue queries', () => {
  describe('query creation', () => {
    it('should return an initial query', () => {
      const owner = 'expressjs'
      const name = 'express'
      const cursor = undefined
      expect(createQuery(owner, name, cursor)).toMatchSnapshot()
    })
    it('should return a subsequent query', () => {
      const owner = 'expressjs'
      const name = 'express'
      const cursor = 'Y3Vyc29yOnYyOpHOAkR9fQ=='
      expect(createQuery(owner, name, cursor)).toMatchSnapshot()
    })
  })
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
