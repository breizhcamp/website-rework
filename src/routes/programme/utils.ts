import { firstWednesdayOfEvent } from '$lib/constants';
import { dayPeriods, type Session } from './constants';

export function getDaysFromSchedule(schedule: Array<Session>) {
	const days = schedule
		.map((event) => event.event_start)
		.map((event) => new Date(Date.UTC(event.getFullYear(), event.getMonth(), event.getDate())));
	return Array.from(new Set(days.map((day) => day.getTime())))
		.sort((timeA, timeB) => timeA - timeB)
		.map((time) => new Date(time));
}

export function getRoomsFromSchedule(schedule: Array<Session>) {
	const venues = schedule.map((event) => event.venue);
	return Array.from(new Set(venues)).sort((roomA, roomB) => roomA.localeCompare(roomB));
}

export function getEventTypesFromSchedule(schedule: Array<Session>) {
	const eventTypes = schedule.map((event) => event.event_type);
	return Array.from(new Set(eventTypes)).sort((eventTypeA, eventTypeB) =>
		eventTypeA.localeCompare(eventTypeB)
	);
}

export function pairTimes<T>(times: T[]): { startAt: T; endAt: T }[] {
	return times.slice(0, -1).map((t, i) => ({ startAt: t, endAt: times[i + 1]! }));
}

export function groupSessionsByRoom(
	sessions: Array<Session>,
	rooms: Array<string>
): Record<string, Array<Session>> {
	const res = rooms.reduce(
		(acc, room) => {
			acc.push([room, sessions.filter((session) => session.venue === room)]);
			return acc;
		},
		[] as Array<[room: string, sessions: Array<Session>]>
	);
	return Object.fromEntries(res);
}

export function groupSessionsBySlots(
	sessions: Array<Session>,
	selectedDayOfWeek: number
): Array<{ startAt: Date; endAt: Date; label: string; sessions: Array<Session> }> {
	const slots = dayPeriods.find((period) => period.day === selectedDayOfWeek)!.times!;

	return slots
		.reduce(
			(acc, slot) => {
				acc.push({
					...slot,
					sessions: sessions.filter(
						(session) =>
							session.event_start.getTime() >= slot.startAt.getTime() &&
							session.event_end.getTime() <= slot.endAt.getTime()
					)
				});
				return acc;
			},
			[] as Array<{ startAt: Date; endAt: Date; label: string; sessions: Array<Session> }>
		)
		.map((slot) => ({
			...slot,
			sessions: slot.sessions.sort(sortEventsDateAndVenue)
		}));
}

type Filter = {
	search: string;
	dayOfWeek: number;
	eventTypes: Array<string>;
};

export function filterSessions(schedule: Array<Session>, filter: Filter): Array<Session> {
	const regex = new RegExp(filter.search.split(' ').join('|'), 'i');

	return schedule
		.filter((event) => event.day_of_week === filter.dayOfWeek)
		.map((event) => {
			const isEventTypeSelected =
				!filter.eventTypes.length || filter.eventTypes.includes(event.event_type);

			const isEventSearched = !filter.search || regex.test(event.search);

			return {
				...event,
				filter: (isEventTypeSelected && isEventSearched
					? 'visible'
					: 'hidden') as Session['filter']
			};
		});
}

export function groupSessionsBySlotsAndRooms(
	daySessions: Array<Session>,
	eventRooms: Array<string>,
	selectedDayOfWeek: number
) {
	return groupSessionsBySlots(daySessions, selectedDayOfWeek).map(({ sessions, ...rest }) => ({
		...rest,
		sessions: groupSessionsByRoom(sessions, eventRooms)
	}));
}

export type DaySessionsBySlot = ReturnType<typeof groupSessionsBySlotsAndRooms>[number];

export function formatDate(date: Date) {
	return `${((24 + date.getHours() - 2) % 24).toFixed().padStart(2, '0')}h${date.getMinutes().toFixed().padStart(2, '0')}`;
}

export function formatDay(day: Date) {
	const res = day.toLocaleDateString('fr-FR', { weekday: 'long' });
	return res.charAt(0).toUpperCase() + String(res).slice(1);
}

export function formatDayOfWeek(dayOfWeek: 3 | 4 | 5) {
	const day = new Date(firstWednesdayOfEvent);
	day.setDate(day.getDate() + dayOfWeek - 3);
	return day.toLocaleDateString('fr-FR', { weekday: 'long' });
}

export function sortEventsDate(eventA: Session, eventB: Session) {
	return eventA.event_start.getTime() - eventB.event_start.getTime();
}

export function sortEventsDateAndVenue(eventA: Session, eventB: Session) {
	const dateDiff =
		new Date(eventA.event_start).getTime() - new Date(eventB.event_start).getTime();
	if (dateDiff !== 0) return dateDiff;
	return eventA.venue.localeCompare(eventB.venue);
}

export function getThemeIndex(eventTypes: Array<string>, event: Session) {
	return eventTypes.findIndex((eventType) => eventType === event.event_type);
}

export function getDuration(event: Session) {
	return (event.event_end.getTime() - event.event_start.getTime()) / 1000 / 60;
}
