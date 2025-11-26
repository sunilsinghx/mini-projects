import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    server: command === 'serve' ? {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
        cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
      },
      port: 5173,
    } : undefined,
  };
});
