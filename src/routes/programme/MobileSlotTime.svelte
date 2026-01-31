<script lang="ts">
	import type { PeriodTime } from './constants';
	import { formatDate } from './utils';

	type Props = PeriodTime;

	const { startAt, endAt, label }: Props = $props();
</script>

<div class="label">
	{label}
</div>
<div class="time">
	{formatDate(startAt)} — {formatDate(endAt)}
</div>

<style>
	.label {
		margin-top: 20px;
	}
	.time {
		font-style: italic;
		font-size: 14px;
		border-bottom: 1px solid #e5e7eb;
	}
</style>
