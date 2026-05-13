import { mkdir, rm, readdir, copyFile, stat } from 'fs/promises';
import { watch } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = resolve(__dirname, 'public');
const distDir = resolve(__dirname, 'dist');

async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = resolve(src, entry.name);
    const destPath = resolve(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await copyFile(srcPath, destPath);
    }
  }
}

async function build() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });
  await copyDir(publicDir, distDir);
  console.log('✅  Build completo: public/ -> dist/');
}

async function main() {
  const args = process.argv.slice(2);
  const watchMode = args.includes('--watch');

  await build();

  if (watchMode) {
    console.log('👀  Modo watch activo. Observando cambios en public/ ...');
    let timer;
    const reload = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(async () => {
        try {
          await build();
        } catch (error) {
          console.error('❌ Error al reconstruir:', error);
        }
      }, 150);
    };

    watch(publicDir, { recursive: true }, (eventType, filename) => {
      if (filename) reload();
    });
  }
}

main().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
