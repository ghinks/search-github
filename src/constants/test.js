import constants from './index'
describe('constants', () => {
  it('get the constants', () => {
    expect(constants).toMatchSnapshot()
  })
})
