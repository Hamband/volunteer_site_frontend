<script>
	import { createEventDispatcher } from 'svelte';
	import { fly, fade, slide } from 'svelte/transition';
	import SearchList from './SearchList.svelte';
	const dispatch = createEventDispatcher();
	export let label;
	export let validations = {};
	export let error;
	export let errorMessage = false;
	export let val;
	export let ableSearch = false;
	export let url;
	let isPending = true;
	let showSearch = false;
	if (validations.required) errorMessage = `تکمیل فیلد ${label} الزامیست`;
	const persianLetters = /^[\u0600-\u06FF\s]+$/;
	const numbers = /^[\u06F0-\u06F90-9]+$/;
	const englishLetter = /[a-zA-Z]/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	export const check = () => {
		if ((validations.required && !val) || val.length == 0)
			errorMessage = `تکمیل فیلد ${label} الزامیست`;
		else if (val) errorMessage = false;
		if (validations.persian) {
			if (!persianLetters.test(val)) val = val.substring(0, val.length - 1);
		} else if (validations.number) {
			if (!numbers.test(val)) val = val.substring(0, val.length - 1);
		} else if (validations.english) {
			if (!englishLetter.test(val)) val = val.substring(0, val.length - 1);
		} else if (validations.email) {
			if (!emailRegex.test(val)) errorMessage = `ایمیل خود را به درستی وارد کنید`;
			else errorMessage = false;
		}
		if (validations.max) {
			if (val.length > max) val = val.substring(0, max);
		}
		if (validations.length) {
			if (val.length != length) errorMessage = `${label} را به درستی وارد کنید`;
			else errorMessage = false;
		}
		if (validations.min) {
			if (val.length < validations.min) errorMessage = `${label} خود را به درستی وارد کنید`;
			else errorMessage = false;
			console.log(errorMessage);
		}

		console.log(errorMessage);
		if (errorMessage) error = true;
		else error = false;
		showData();
	};

	let data = ['has', 'tes'];

	//closeItems
	let element;
	function selectCustom(node) {
		element = node;
		const customSelect = element,
			// customSelect_selectBtn = customSelect.querySelector('.select-btn'),
			customSelect_searchInputInp = customSelect.querySelector('input'),
			// customSelect_options = customSelect.querySelector('.options'),
			customSelect_content = customSelect.querySelector('.search-content');

		window.addEventListener('click', (event) => {
			if (
				![
					// customSelect,
					// customSelect_selectBtn,
					customSelect_searchInputInp,
					customSelect_content
				].includes(event.target)
			) {
				showSearch = false;
			}
		});
	}

	const getData = async () => {
		await axios
			.get('url', {
				params: {
					api_key: 'mecaenizajocjutebyeckrewtaegckor',
					prefix: val,
					num: 10
				}
			})
			.then((response) => {
				newData = response.data;
				isPending = false;
			});
	};
	//filter
	$: newData = data.filter((data) => true);
	const showData = () => {
		console.log(val, 'ss');
		if (url) {
			getData();
		} else {
			newData = data.filter((data) => {
				if (val) return data.toLowerCase().startsWith(val);
				return true;
			});
			isPending = false;
		}
	};
	if (ableSearch) showData();
</script>

{#if error && error != 2}
	<span class="mb-1 -text-error text-xs">{errorMessage}</span>
{/if}
<div use:selectCustom>
	<div
		transition:fade={{ duration: 200 }}
		class="w-full h-12 rounded-lg bg-gray-700 bg-opacity-50 backdrop-blur-2xl p-2 flex items-center justify-between {error &&
		error != 2
			? 'border -border-error'
			: ''}"
	>
		<input
			type="text"
			on:keyup={check}
			bind:value={val}
			on:focus={() => {
				showSearch = true;
				console.log(showSearch);
			}}
			class="w-10/12 border-none bg-transparent outline-none text-sm pt-2"
		/>
		<span class:active={val}>{label}</span>
		{#if error && error != 2}
			<i
				class="fi fi-sr-exclamation -text-error"
				in:fly={{ x: 10, duration: 200, delay: 200 }}
				out:fly={{ x: -10, duration: 200 }}
			></i>
		{:else if error == false && Object.keys(validations).length > 0}
			<i
				class="fi fi-sr-check-circle -text-success"
				in:fly={{ x: 10, duration: 200, delay: 200 }}
				out:fly={{ x: -10, duration: 200 }}
			></i>
		{/if}
	</div>
	{#if ableSearch && showSearch}
		<div transition:slide={{ duration: 200 }} class="search-content relative w-full">
			<SearchList
				bind:data={newData}
				bind:val
				bind:isPending
				on:select={({ detail }) => {
					console.log(detail);
					showSearch = false;
					val = detail;
				}}
			/>
		</div>
	{/if}
</div>

<style>
	input + span {
		color: #cbcbcb;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		font-size: 14px;
		right: 20px;
		transition: 0.2s;
		pointer-events: none;
	}
	input:focus + span {
		color: #d8b4fe;
		font-size: 9px;
		top: 25%;
		right: 10px;
	}
	input + span.active {
		color: #d8b4fe;
		font-size: 9px;
		top: 25%;
		right: 10px;
	}
</style>
