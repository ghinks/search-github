import { getEnvToken, getConfigToken, __RewireAPI__ as authRewire } from './index'

describe('authentication', () => {
  describe('Passing', () => {
    const gitconfig = {
      'user': {
        'name': 'glenn vincent hinks',
        'email': 'ghinks@yahoo.com'
      },
      'core': {
        'excludesfile': '/Users/developer/.gitignore_global',
        'autocrlf': 'input'
      },

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
    const gitconfig = {
      'user': {
        'name': 'glenn vincent hinks',
        'email': 'ghinks@yahoo.com'
      },
      'core': {
        'excludesfile': '/Users/developer/.gitignore_global',
        'autocrlf': 'input'
      }
    }
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
})
