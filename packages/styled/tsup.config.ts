import { defineConfig } from 'tsup';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const USE_CLIENT = "'use client';\n";

export default defineConfig({
  entry: ['src/index.ts', 'src/tailwind-preset.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  outExtension({ format }) {
    return { js: format === 'esm' ? '.mjs' : '.cjs' };
  },
  async onSuccess() {
    const dist = join(process.cwd(), 'dist');
    for (const file of ['index.mjs', 'index.cjs']) {
      const path = join(dist, file);
      const contents = await readFile(path, 'utf8');
      if (!contents.startsWith(USE_CLIENT)) {
        await writeFile(path, USE_CLIENT + contents);
      }
    }
  },
});
