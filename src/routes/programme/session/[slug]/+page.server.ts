import { error } from '@sveltejs/kit';
import { schedule } from '../../constants';
import { getDuration, getThemeIndex } from '../../utils';

export const load = async ({ params, parent }) => {
	const data = await parent();
	const event = schedule.find((event) => event.id === params.slug);

	if (event) {
		return {
			...event,
			themeIndex: getThemeIndex(data.eventTypes, event),
			duration: getDuration(event)
		};
	}

	error(404, 'Not found');
};
