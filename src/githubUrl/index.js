import { URL } from 'url'

const parseGithubUrl = (url) => {
  let githubUrl;
  try {
    githubUrl = new URL(url)
    const [owner, name] = githubUrl.pathname.slice(1).split('/')
    if (!owner || !name) return undefined
    return {
      owner,
      name
    }
  } catch (err) {
    // take no action
    // return undefined
  }
}

export default parseGithubUrl
