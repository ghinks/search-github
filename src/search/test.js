import filter, { makeArray } from './index'

describe('Search', () => {
  const node1 = { body: '... abc body1 ... xyz' }
  const node2 = { body: '... abc body2 ... xyz' }
  const node3 = { body: '... abc body3 ... xyz' }
  const nodes = [node1, node2, node3]

  describe('make array', () => {
    test('given a string create an array of 1', () => {
      const searchTerm = '.*'
      expect(makeArray(searchTerm)).toEqual(expect.arrayContaining([searchTerm]))
    })
    test('given an array expect an array', () => {
      const searchTerms = ['abc', 'efg']
      expect(makeArray(searchTerms)).toEqual(expect.arrayContaining(searchTerms))
    })
  })

  describe('failing cases', () => {
    test('given no nodes expect no nodes', () => {
      const searchTerm = '.*'
      const value = filter([], searchTerm)
      expect(value.length).toBe(0)
    })

    test('given no array expect no nodes', () => {
      const searchTerm = '.*'
      const value = filter(null, searchTerm)
      expect(value.length).toEqual(expect.arrayContaining([]))
    })

    test('given nodes with no text expect no results', () => {
      const searchTerm = '.*'
      const value = filter([{}], searchTerm)
      expect(value.length).toEqual(expect.arrayContaining([]))
    })
  })

  describe('single search terms', () => {
    test('given a wild card expect all nodes to match', () => {
      const searchTerm = '.*'
      expect(filter(nodes, searchTerm)).toEqual(expect.arrayContaining(nodes))
    })
    test('expect to find only one match', () => {
      const searchTerm = '.*body1.*'
      const value = filter(nodes, searchTerm)
      expect(value).toEqual(expect.arrayContaining([node1]))
      expect(value.length).toBe(1)
    })
    test('expect to find two matches', () => {
      const searchTerm = '.*body[12].*'
      const value = filter(nodes, searchTerm)
      expect(value).toEqual(expect.arrayContaining([node1, node2]))
      expect(value.length).toBe(2)
    })
  })

  describe('multiple search terms', () => {
    const searchTerm1 = '.*'
    const searchTerm2 = '.*body2.*'
    const searchTerm3 = '.*body3.*'
    test('given a wild card expect all nodes to match', () => {
      expect(filter(nodes, [searchTerm1])).toEqual(expect.arrayContaining(nodes))
    })
    test('expect to find only one match', () => {
      const value = filter(nodes, [searchTerm2])
      expect(value).toEqual(expect.arrayContaining([node2]))
      expect(value.length).toBe(1)
    })
    test('expect to find two matches', () => {
      const value = filter(nodes, [searchTerm2, searchTerm3])
      expect(value).toEqual(expect.arrayContaining([node2, node3]))
      expect(value.length).toBe(2)
    })
  })
})
