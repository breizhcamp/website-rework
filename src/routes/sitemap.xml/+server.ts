import { PUBLIC_BASE_URL } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';
import { posts as allPosts, getPages } from '../files';

const getUrl = (path: string | undefined) =>
	`${PUBLIC_BASE_URL}${!path ? '/' : path.endsWith('/') ? path : `${path}/`}`;
const getEntry = (url: string, priority = 0.85) =>
	`<url><loc>${url}</loc><priority>${priority}</priority></url>`;

const render = (pages: string[], posts: string[]) => `<?xml version="1.0" encoding="UTF-8" ?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${pages.join('')}
		${posts.join('')}
	</urlset>
`;

export const prerender = true;

export const GET: RequestHandler = async () => {
	const pages = getPages(true)
		.map((file) => /^\.(\/.*)\/\+page\.svelte$/.exec(file)?.[1])
		.map(getUrl)
		.map((url) => getEntry(url, 0.85));

	const posts = allPosts
		.map((post) => `${post.slug}`)
		.map(getUrl)
		.map((url) => getEntry(url, 0.69));

	const sitemap = render(pages, posts);

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
