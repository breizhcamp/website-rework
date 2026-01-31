import { schedule } from './constants';
import { getDaysFromSchedule, getEventTypesFromSchedule, getRoomsFromSchedule } from './utils';

export function load() {
	return {
		schedule,
		eventDays: getDaysFromSchedule(schedule),
		eventRooms: getRoomsFromSchedule(schedule),
		eventTypes: getEventTypesFromSchedule(schedule)
	};
}
