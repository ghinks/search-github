import parse from 'parse-git-config'
import os from 'os'
import get from 'lodash.get'

const getEnvToken = () => process.env.GITHUB_TOKEN

const getConfigToken = () => {
  console.log(parse)
  const config = parse.sync({
    path: `${os.homedir()}/.gitconfig`
  })
  if (get(config, 'github-search.token')) {
    return config['github-search'].token
  }
  return undefined
}

export { getConfigToken, getEnvToken }
