import * as path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.resolve(fileURLToPath(import.meta.url), '../');

export const extension = '.md';

export const mdsvexConfig = {
	extension,
	layout: {
		'blog-post': path.join(dirname, './src/routes/blog/blogPostLayout.svelte')
	}
};
