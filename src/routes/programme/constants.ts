import _schedule from './schedule.json';
import _speakers from './speakers.json';
import { sortEventsDate } from './utils';

type AsideSession = {
	id: string;
	name: string;
	description: null;
	speakers: null;
	language: null;
	format: string;
	venue: string;
	search: string;
	event_start: Date;
	event_end: Date;
	day_of_week: 3 | 4 | 5;
	event_type: string;
	venue_id: string;
	video_url: string;
	files_url: null;
	slides_url: null;
	level: null;
	filter: 'visible' | 'hidden';
};

type Talk = {
	id: string;
	name: string;
	description: string;
	speakers: Array<Speaker | string>;
	language: string;
	format: string;
	venue: string;
	search: string;
	event_start: Date;
	event_end: Date;
	day_of_week: 3 | 4 | 5;
	event_type: string;
	venue_id: string;
	video_url: string;
	files_url: string;
	slides_url: string;
	level: 'Introduction' | 'Standard' | 'Avancé';
	filter: 'visible' | 'hidden';
};

export type Session = AsideSession | Talk;

export type Speaker = {
	id: string;
	lastname: string;
	firstname: string;
	imageProfilURL: string | null;
	bio: string;
	github: null;
	googleplus: null;
	twitter: null;
	social: null;
};

export type PeriodTime = (typeof dayPeriods)[number]['times'][number];

const speakers = _speakers as Array<Speaker>;

const schedule = _schedule
	.map((event) => {
		const eventStart = new Date(`${event.event_start}Z`);
		const _speakers = event.speakers
			? event.speakers.split(', ').map((fullName) => {
					// FIXME this is not serious
					const s = speakers.find(
						(speaker) => fullName === `${speaker.firstname} ${speaker.lastname}`
					);
					return s ?? fullName;
				})
			: null;
		return {
			...event,
			event_start: eventStart,
			event_end: new Date(`${event.event_end}Z`),
			day_of_week: eventStart.getDay(),
			search: `${event.name} ${event.speakers.replace('/,/', '')}`,
			speakers: _speakers,
			filter: 'visible'
		} as Session;
	})
	.sort(sortEventsDate);

export { schedule, speakers };

export const dayPeriods = [
	{
		day: 3,
		label: 'Mercredi',
		date: '2025-06-25',
		times: [
			{
				startAt: new Date('2025-06-25T09:00:00.000Z'),
				endAt: new Date('2025-06-25T10:00:00.000Z'),
				label: 'Accueil'
			},
			{
				startAt: new Date('2025-06-25T10:00:00.000Z'),
				endAt: new Date('2025-06-25T12:00:00.000Z'),
				label: 'Universités & conférences'
			},
			{
				startAt: new Date('2025-06-25T12:00:00.000Z'),
				endAt: new Date('2025-06-25T13:30:00.000Z'),
				label: 'Déjeuner'
			},
			{
				startAt: new Date('2025-06-25T13:30:00.000Z'),
				endAt: new Date('2025-06-25T15:30:00.000Z'),
				label: 'Universités & conférences'
			},
			{
				startAt: new Date('2025-06-25T15:30:00.000Z'),
				endAt: new Date('2025-06-25T16:00:00.000Z'),
				label: 'Pause'
			},
			{
				startAt: new Date('2025-06-25T16:00:00.000Z'),
				endAt: new Date('2025-06-25T18:00:00.000Z'),
				label: 'Universités & conférences'
			}
		]
	},
	{
		day: 4,
		label: 'Jeudi',
		date: '2025-06-26',
		times: [
			{
				startAt: new Date('2025-06-26T08:00:00.000Z'),
				endAt: new Date('2025-06-26T10:00:00.000Z'),
				label: 'Accueil & keynote'
			},
			{
				startAt: new Date('2025-06-26T10:00:00.000Z'),
				endAt: new Date('2025-06-26T10:30:00.000Z'),
				label: 'Pause'
			},
			{
				startAt: new Date('2025-06-26T10:30:00.000Z'),
				endAt: new Date('2025-06-26T11:30:00.000Z'),
				label: 'Conférences'
			},
			{
				startAt: new Date('2025-06-26T11:30:00.000Z'),
				endAt: new Date('2025-06-26T12:30:00.000Z'),
				label: 'Conférences'
			},
			{
				startAt: new Date('2025-06-26T12:30:00.000Z'),
				endAt: new Date('2025-06-26T13:30:00.000Z'),
				label: 'Déjeuner & capsules'
			},
			{
				startAt: new Date('2025-06-26T13:30:00.000Z'),
				endAt: new Date('2025-06-26T14:30:00.000Z'),
				label: 'Conférences'
			},
			{
				startAt: new Date('2025-06-26T14:30:00.000Z'),
				endAt: new Date('2025-06-26T15:30:00.000Z'),
				label: 'Conférences'
			},
			{
				startAt: new Date('2025-06-26T15:30:00.000Z'),
				endAt: new Date('2025-06-26T16:00:00.000Z'),
				label: 'Pause'
			},
			{
				startAt: new Date('2025-06-26T16:00:00.000Z'),
				endAt: new Date('2025-06-26T17:00:00.000Z'),
				label: 'Conférences'
			},
			{
				startAt: new Date('2025-06-26T17:00:00.000Z'),
				endAt: new Date('2025-06-26T17:30:00.000Z'),
				label: 'Tools in action'
			},
			{
				startAt: new Date('2025-06-26T17:30:00.000Z'),
				endAt: new Date('2025-06-26T18:00:00.000Z'),
				label: 'Tools in action'
			},
			{
				startAt: new Date('2025-06-26T18:00:00.000Z'),
				endAt: new Date('2025-06-26T19:00:00.000Z'),
				label: 'Keynote'
			},
			{
				startAt: new Date('2025-06-26T19:00:00.000Z'),
				endAt: new Date('2025-06-26T23:00:00.000Z'),
				label: 'Soirée'
			}
		]
	},
	{
		day: 5,
		label: 'Vendredi',
		date: '2025-06-27',
		times: [
			{
				startAt: new Date('2025-06-27T08:00:00.000Z'),
				endAt: new Date('2025-06-27T10:00:00.000Z'),
				label: 'Accueil & keynote'
			},
			{
				startAt: new Date('2025-06-27T10:00:00.000Z'),
				endAt: new Date('2025-06-27T10:30:00.000Z'),
				label: 'Pause'
			},
			{
				startAt: new Date('2025-06-27T10:30:00.000Z'),
				endAt: new Date('2025-06-27T11:30:00.000Z'),
				label: 'Conférences'
			},
			{
				startAt: new Date('2025-06-27T11:30:00.000Z'),
				endAt: new Date('2025-06-27T12:30:00.000Z'),
				label: 'Conférences'
			},
			{
				startAt: new Date('2025-06-27T12:30:00.000Z'),
				endAt: new Date('2025-06-27T13:30:00.000Z'),
				label: 'Déjeuner & capsules'
			},
			{
				startAt: new Date('2025-06-27T13:30:00.000Z'),
				endAt: new Date('2025-06-27T14:30:00.000Z'),
				label: 'Conférences'
			},
			{
				startAt: new Date('2025-06-27T14:30:00.000Z'),
				endAt: new Date('2025-06-27T15:30:00.000Z'),
				label: 'Conférences'
			},
			{
				startAt: new Date('2025-06-27T15:30:00.000Z'),
				endAt: new Date('2025-06-27T16:00:00.000Z'),
				label: 'Pause'
			},
			{
				startAt: new Date('2025-06-27T16:00:00.000Z'),
				endAt: new Date('2025-06-27T16:30:00.000Z'),
				label: 'Conférences'
			},
			{
				startAt: new Date('2025-06-27T16:30:00.000Z'),
				endAt: new Date('2025-06-27T17:00:00.000Z'),
				label: 'Keynote'
			}
		]
	}
];
