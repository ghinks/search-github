import { getIssues, createQuery, request, __RewireAPI__ as issuesRewire } from './index'
import nock from 'nock'
import fsp from 'fs/promises'

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
  describe('Request', () => {
    let response
    beforeEach((done) => {
      fsp.readFile(`${__dirname}/test.data.json`, 'utf8')
        .then((testData) => {
          response = JSON.parse(testData)
          nock(/.*/)
            .post(/.*/)
            .reply(200, response)
          done()
        })
    })
    test('An initial request should fetch data', async () => {
      expect.assertions(1)
      const owner = 'bob'
      const name = 'bobs-special-code'
      const query = createQuery(owner, name)
      const result = await request('token', query)
      expect(result).toMatchSnapshot()
    })
  })
  describe('Issues', () => {
    let response
    beforeEach((done) => {
      fsp.readFile(`${__dirname}/test.data.json`, 'utf8')
        .then((testData) => {
          response = JSON.parse(testData)
          issuesRewire.__Rewire__('request', () => Promise.resolve(response))
          issuesRewire.__Rewire__('getToken', () => 'token')
          done()
        })
    })
    afterEach(() => {
      issuesRewire.__ResetDependency__('request')
      issuesRewire.__ResetDependency__('getToken')
    })
    test('Expect a list of issues', async () => {
      expect.assertions(1)
      const result = await getIssues('expressjs', 'express', 'undefined')
      expect(result).toMatchSnapshot()
    })
  })
})
