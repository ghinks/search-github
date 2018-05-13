import search from '../src/index'
search('expressjs', 'express', ['undefined'])
  .then((result) => {
    console.log(Array(100).join('-'))
    console.log(JSON.stringify(result, null, 2))
    console.log(Array(100).join('-'))
  })
  .catch(err => console.error(err.message))
