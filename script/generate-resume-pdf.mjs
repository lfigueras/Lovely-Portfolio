import { existsSync, statSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const chromePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const resumeHtml = path.join(projectRoot, 'public', 'resume.html')
const resumePdf = path.join(projectRoot, 'public', 'Lovely-Joy-Figueras-Resume.pdf')
const result = spawnSync(chromePath, [
  '--headless',
  '--no-pdf-header-footer',
  `--print-to-pdf=${resumePdf}`,
  pathToFileURL(resumeHtml).href,
], { encoding: 'utf8' })

if (result.error) {
  throw new Error(`Could not start Chrome at "${chromePath}". Set CHROME_PATH to its executable path.`)
}

if (result.status !== 0) {
  throw new Error(result.stderr.trim() || `Chrome PDF export exited with status ${result.status}.`)
}

if (!existsSync(resumePdf) || statSync(resumePdf).size === 0) {
  throw new Error('Chrome did not create the résumé PDF.')
}

console.log('Updated public/Lovely-Joy-Figueras-Resume.pdf')