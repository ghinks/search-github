const makeArray = (arg) => Array.isArray(arg) ? arg : [arg]

const filter = (nodes, searches) => {
  if (!Array.isArray(nodes)) return []
  const searchTerms = makeArray(searches)
  return nodes.reduce((acc, node) => {
    const text = node.title
    if (!text) return acc
    if (searchTerms.some((term) => {
      const regex = new RegExp(term, 'i')
      return text.match(regex)
    })) {
      return [...acc, node]
    }
    return acc
  }, [])
}

export { filter as default, makeArray }
