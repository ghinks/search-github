import parse from 'parse-git-config'
import os from 'os'

const getEnvToken = () => {
  return process.env.GITHUB_TOKEN
}

const getConfigToken = () => {
  console.log(parse)
  const config = parse.sync({
    path: `${os.homedir()}/.gitconfig`
  })
  if (config['github-search'] &&
    config['github-search'].token) {
    return config['github-search'].token
  }
  return undefined
}

export { getConfigToken, getEnvToken }