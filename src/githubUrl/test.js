import parseGithubUrl from './index'

describe('Parse github url', () => {
  test('Given a github url get the owner an the name', () => {
    const url = 'https://github.com/facebook/jest'
    const result = parseGithubUrl(url)
    expect(result).toMatchObject({
      owner: 'facebook',
      name: 'jest'
    })
  })
  test('Given a malformed url expect no response', () => {
    const url = 'no://such/'
    const result = parseGithubUrl(url)
    expect(result).toBeUndefined()
  })
  test('Given no url expect no response', () => {
    const url = ''
    const result = parseGithubUrl(url)
    expect(result).toBeUndefined()
  })
})
