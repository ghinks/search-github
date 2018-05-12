import hello from './index'

describe('setup test', () => {
  test('hello', () => {
    expect(hello()).toBe('hello')
  })
})
