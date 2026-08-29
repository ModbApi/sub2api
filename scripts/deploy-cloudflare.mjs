import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const envFile = '.env'
if (existsSync(envFile) && typeof process.loadEnvFile === 'function') process.loadEnvFile(envFile)
const showHelp = process.argv.includes('--help')
const projectName = process.env.CLOUDFLARE_PAGES_PROJECT_NAME?.trim() || 'sub2api-site'
if (showHelp) {
  console.log(`Deployment check passed. Target Pages project: "${projectName}"`)
  console.log('Run npm run deploy with Node.js 22+ to upload dist/.')
  process.exit(0)
}
const [major] = process.versions.node.split('.').map(Number)
if (major < 22) {
  console.error(`Wrangler 4 requires Node.js 22 or newer. Current version: ${process.versions.node}`)
  process.exit(1)
}
const command = process.platform === 'win32' ? 'wrangler.cmd' : 'wrangler'
const args = ['pages', 'deploy', 'dist', '--project-name', projectName]
if (existsSync(envFile)) args.push(`--env-file=${envFile}`)
if (process.env.CLOUDFLARE_PAGES_BRANCH?.trim()) args.push('--branch', process.env.CLOUDFLARE_PAGES_BRANCH.trim())
console.log(`Deploying dist/ to Cloudflare Pages project "${projectName}"...`)
const result = spawnSync(command, args, { stdio: 'inherit' })
if (result.error) { console.error(`Failed to start Wrangler: ${result.error.message}`); process.exit(1) }
process.exit(result.status ?? 1)
