import { describe, expect, it } from 'vitest';
import { schedule } from './constants';
import { getDaysFromSchedule } from './utils';

describe('utils - getDaysFromSchedule', () => {
	it('should return empty array if schedule is empty', () => {
		expect(getDaysFromSchedule([])).toStrictEqual([]);
	});

	it('should return empty array if schedule is empty', () => {
		expect(getDaysFromSchedule(schedule)).toStrictEqual([
			new Date('2025-06-25'),
			new Date('2025-06-26'),
			new Date('2025-06-27')
		]);
	});
});
