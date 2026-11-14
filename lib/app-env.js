import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const APP_VERSION = (() => {
	try {
		return JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version ?? '';
	} catch {
		return '';
	}
})();

export const OS = process.platform === 'win32' ? 'windows' : 'linux';

export const BASE = 'arcadeplanet';
