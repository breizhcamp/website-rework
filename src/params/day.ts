import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is '3' | '4' | '5' => {
	return param === '3' || param === '4' || param === '5';
}) satisfies ParamMatcher;
