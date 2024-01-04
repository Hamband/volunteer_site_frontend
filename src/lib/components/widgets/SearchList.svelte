<script>
	import axios from 'axios';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let data;
	export let isPending = true;
	const sendValue = (value) => {
		dispatch('select', value);
	};
</script>

<div
	class="w-full bg-gray-800 bg-opacity-95 backdrop-blur-3xl rounded-lg p-3 absolute top-0 right-0 z-20"
>
	{#if isPending}
		<span class="loading loading-dots loading-md"></span>
	{:else}
		<ul>
			{#if data.length > 0}
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				{#each data as d}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li on:click={sendValue(d)} class="cursor-pointer">
						{d}
					</li>
				{/each}
			{:else}
				<li>نتیجه‌ای یافت نشد</li>
			{/if}
		</ul>
	{/if}
</div>
