const makeArray = (arg) => Array.isArray(arg) ? arg : [arg]

const filter = (nodes, searchTerms) => {
  if (!Array.isArray(nodes)) return []
  const searches = makeArray(searchTerms)
}

export { filter as default, makeArray }
