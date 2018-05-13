import getToken, { getEnvToken, getConfigToken, __RewireAPI__ as authRewire } from './index'

describe('authentication', () => {
  describe('Passing', () => {
    const gitconfig = {
      'github-search': {
        'token': 'abc'
      }
    }
    let envToken
    beforeAll(() => {
      envToken = process.env.GITHUB_TOKEN
      process.env.GITHUB_TOKEN = 'abc'
      authRewire.__Rewire__('parse', { sync: () => gitconfig })
      jest.resetModules()
    })
    afterAll(() => {
      process.env.GITHUB_TOKEN = envToken
      authRewire.__ResetDependency__('parse')
    })
    test('get github token', () => {
      expect(getEnvToken()).toMatchSnapshot()
    })

    test('get config token', () => {
      expect(getConfigToken()).toMatchSnapshot()
    })
  })

  describe('failing', () => {
    const gitconfig = {}
    let envToken
    beforeAll(() => {
      envToken = process.env.GITHUB_TOKEN
      process.env.GITHUB_TOKEN = undefined
      authRewire.__Rewire__('parse', { sync: () => gitconfig })
      jest.resetModules()
    })
    afterAll(() => {
      process.env.GITHUB_TOKEN = envToken
      authRewire.__ResetDependency__('parse')
    })
    test('get github token', () => {
      expect(getEnvToken()).toBe('undefined')
    })
    test('get no config token', () => {
      expect(getConfigToken()).toBeUndefined()
    })
  })

  describe('only config token', () => {
    const gitconfig = {
      'github-search': {
        'token': 'abc'
      }
    }
    beforeAll(() => {
      authRewire.__Rewire__('getEnvToken', () => undefined)
      authRewire.__Rewire__('parse', { sync: () => gitconfig })
    })
    afterAll(() => {
      authRewire.__ResetDependency__('getEnvToken')
      authRewire.__ResetDependency__('parse')
    })
    test('get config token only', () => {
      expect(getToken()).toMatchSnapshot()
    })
  })

  describe('only env token', () => {
    let envToken
    beforeAll(() => {
      envToken = process.env.GITHUB_TOKEN
      process.env.GITHUB_TOKEN = 'abc'
      jest.resetModules()
    })
    afterAll(() => {
      process.env.GITHUB_TOKEN = envToken
    })
    test('get env github token', () => {
      expect(getToken()).toMatchSnapshot()
    })
  })
})
