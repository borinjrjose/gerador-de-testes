import { existsSync, mkdirSync } from 'fs'

const ensureDirExists = (dir) => {
  if (existsSync(dir)) return true

  mkdirSync(dir)
}

export default ensureDirExists
