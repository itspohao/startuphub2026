import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(projectDir, 'dist');

await fs.rm(distDir, { recursive: true, force: true });
await fs.mkdir(path.join(distDir, 'server'), { recursive: true });
await fs.cp(path.join(projectDir, 'public'), path.join(distDir, 'assets'), {
  recursive: true,
  filter: (source) => !source.endsWith('.DS_Store'),
});
await fs.copyFile(path.join(projectDir, 'worker', 'index.js'), path.join(distDir, 'server', 'index.js'));
