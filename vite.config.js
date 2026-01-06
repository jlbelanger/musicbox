import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // eslint-disable-line import/no-unresolved
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => ({
	base: './',
	build: {
		outDir: 'build',
	},
	plugins: [
		react(),
		svgr(),
	],
	server: {
		open: true,
		port: 3000,
	},
}));
