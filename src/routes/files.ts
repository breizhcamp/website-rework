import type { Post } from '$lib/types/blog';

function getPosts() {
	const glob: Record<string, { metadata: Post }> = import.meta.glob('./blog/**/+page.md', {
		eager: true
	});

	const posts = Object.entries(glob)
		.map(([path, post]) => ({
			...post.metadata,
			slug: path.replace('.', '').replace('/+page.md', '')
		}))
		.sort((a, b) => (a.date < b.date ? 1 : -1));

	return posts;
}

export const posts = getPosts();

export function getPages(removeLayouts = false) {
	const glob = import.meta.glob('./**/+page.svelte', { eager: true });
	const paths = Object.keys(glob);
	return removeLayouts ? paths.map((path) => path.replace(/\([^)]*\)\//g, '')) : paths;
}
