/** Dependency-free repository checks. Run with `npm run verify:static`. */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, dirname, extname, relative } from 'node:path'
import assert from 'node:assert/strict'

const root = resolve(import.meta.dirname, '..')
const src = resolve(root, 'src')
const walk = (folder) => readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
  const path = resolve(folder, entry.name)
  return entry.isDirectory() ? walk(path) : [path]
})
const sources = walk(src).filter((file) => ['.js', '.jsx', '.css'].includes(extname(file)))
let imports = 0
let assets = 0
for (const file of sources) {
  const content = readFileSync(file, 'utf8')
  for (const match of content.matchAll(/(?:\bfrom\s*|\bimport\s*\(|\bimport\s*)['"](\.{1,2}\/[^'"]+)['"]/g)) {
    // Skip the illustrative import inside the Text playground's code sample.
    if (file.endsWith('/Text/Text.jsx') && match[1].startsWith('./Text/')) continue
    const target = resolve(dirname(file), match[1])
    const candidates = [target, ...['.jsx','.js','.css','.png','.webp','.svg'].map((suffix) => target + suffix), resolve(target, 'index.js')]
    assert(candidates.some(existsSync), `Missing import ${match[1]} from ${relative(root,file)}`)
    imports++
  }
  for (const match of content.matchAll(/['"](\/(?:models|texture|assets)\/[^'"]+\.(?:png|webp|glb))['"]/g)) {
    const target = resolve(root, 'public', '.' + match[1])
    assert(existsSync(target), `Missing public asset ${match[1]} from ${relative(root,file)}`)
    assets++
  }
}
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
const lock = JSON.parse(readFileSync(resolve(root, 'package-lock.json'), 'utf8'))
assert.deepEqual(lock.packages[''].dependencies, pkg.dependencies, 'Lockfile dependencies differ')
assert.deepEqual(lock.packages[''].devDependencies, pkg.devDependencies, 'Lockfile devDependencies differ')
assert(existsSync(resolve(root, 'public/favicon.png')), 'Missing favicon')
console.log(`PASS: ${sources.length} source files; ${imports} local imports; ${assets} public assets; manifest/lockfile in sync.`)
