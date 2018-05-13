import parse from 'parse-git-config'
import os from 'os'
import get from 'lodash.get'

const getEnvToken = () => process.env.GITHUB_TOKEN

const getConfigToken = () => {
  const config = parse.sync({
    path: `${os.homedir()}/.gitconfig`
  })
  if (get(config, 'github-search.token')) {
    return config['github-search'].token
  }
  return undefined
}

const getToken = () => {
  return getEnvToken() || getConfigToken()
}

export { getToken as default, getConfigToken, getEnvToken }
