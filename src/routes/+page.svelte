<script>
	import axios from 'axios';
	import { fade, fly, scale } from 'svelte/transition';
	import Input from '../lib/components/widgets/Input.svelte';
	import { onMount } from 'svelte';

	let blur;
	let error = {
		first_name: null,
		last_name: null,
		test: 2,
		email: 2
	};
	let mY = 0;
	let mX = 0;
	$: ready = false;
	onMount(() => {
		ready = true;
	});
	function backdrop(node) {
		blur = node;
		document.addEventListener('mousemove', function (event) {
			mX = event.clientX - 230;
			mY = event.clientY - 300;
		});
	}
	const tiltEffectSettings = {
		max: 12,
		perspective: 2500,
		scale: 1.1,
		speed: 1000,
		easing: 'cubic-bezier(.03,.98,.52,.99)'
	};
	let card;
	function myCard(node) {
		card = node;
		document.addEventListener('mouseover', handleMouseEnter);
		document.addEventListener('mouseover', handleMouseMove);
		// document.addEventListener('mouseover', handleMouseLeave);
	}
	function handleMouseEnter(event) {
		setTransition(event);
	}

	function handleMouseMove(event) {
		const cardWidth = card.offsetWidth;
		const cardHeight = card.offsetHeight;
		const centerX = card.offsetLeft + cardWidth / 2;
		const centerY = card.offsetTop + cardHeight / 2;
		const mouseX = event.clientX - centerX;
		const mouseY = event.clientY - centerY;
		const rotateXUncapped = (+1 * tiltEffectSettings.max * mouseY) / (cardHeight / 2);
		const rotateYUncapped = (-1 * tiltEffectSettings.max * mouseX) / (cardWidth / 2);
		const rotateX =
			rotateXUncapped < -tiltEffectSettings.max
				? -tiltEffectSettings.max
				: rotateXUncapped > tiltEffectSettings.max
				  ? tiltEffectSettings.max
				  : rotateXUncapped;
		const rotateY =
			rotateYUncapped < -tiltEffectSettings.max
				? -tiltEffectSettings.max
				: rotateYUncapped > tiltEffectSettings.max
				  ? tiltEffectSettings.max
				  : rotateYUncapped;

		card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)
	                          scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
	}

	function handleMouseLeave(event) {
		console.log(event.currentTarget);
		event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
		setTransition(event);
	}

	function setTransition(event) {
		clearTimeout(card.transitionTimeoutId);
		card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
		card.transitionTimeoutId = setTimeout(() => {
			card.style.transition = '';
		}, tiltEffectSettings.speed);
	}

	let first_name, last_name, test1, test2;
	let submitButton;
	function handleSubmitButton(node) {
		submitButton = node;
	}
	const sendData = () => {
		console.log('ppppp');
		let validation = true;
		Object.keys(error).forEach((err) => {
			if (error[err] == true || error[err] == null) {
				validation = false;
				error[err] = true;
			}
		});
		if (!validation) return;

		submitButton.innerHTML = `<span class="loading loading-dots loading-md"></span>`;
	};

	const getUni = async () => {
		const uni_url = 'https://hamband.math.sharif.edu/volunteer/api/v1/get_completions/degrees/uni';
		await axios
			.get(uni_url, {
				params: {
					api_key: 'mecaenizajocjutebyeckrewtaegckor',
					preix: 'شریف',
					num: 10
				}
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	// getUni();
</script>

{#if ready}
	<div
		class="absolute w-[400px] h-[400px] rounded-full blur-3xl mouseover"
		transition:fade={{ duration: 300 }}
		style="--X:{mX}px; --Y:{mY}px;"
		use:backdrop
	></div>
{/if}
{#if ready}
	<div class="pt-32">
		<div
			transition:scale={{ duration: 800, delay: 100 }}
			class="card lg:w-8/12 w-10/12 mx-auto bg-gray-700 bg-opacity-30 backdrop-blur-xl p-4 rounded-xl dir-rtl"
			use:myCard
		>
			<h1 class="font-fedra text-center text-3xl">همبند</h1>
			<form
				action=""
				class="mt-8"
				on:submit|preventDefault={() => {
					sendData();
				}}
			>
				<div class="flex flex-wrap">
					<div
						class="lg:w-1/2 w-full lg:pe-1 mt-2"
						transition:fly={{ duration: 500, delay: 700, x: 400, y: -200 }}
					>
						<Input
							bind:val={first_name}
							label="نام"
							validations={{ required: true }}
							bind:error={error.first_name}
						/>
					</div>
					<div
						class="lg:w-1/2 w-full lg:ps-1 mt-2"
						transition:fly={{ duration: 500, delay: 800, x: -400, y: -200 }}
					>
						<Input
							bind:val={last_name}
							label="نام خانوادگی"
							validations={{ min: '4', required: true }}
							bind:error={error.last_name}
						/>
					</div>
					<div
						class="lg:w-1/2 w-full lg:pe-1 mt-2"
						transition:fly={{ duration: 500, delay: 900, x: 400, y: 200 }}
					>
						<Input bind:val={test1} label="فیلد تستی 1" bind:error={error.test} ableSearch={true} />
					</div>
					<div
						class="lg:w-1/2 w-full lg:ps-1 mt-2"
						transition:fly={{ duration: 500, delay: 1000, x: -400, y: 200 }}
					>
						<Input
							bind:val={test2}
							label="ایمیل"
							validations={{ email: true, validation: false }}
							bind:error={error.email}
						/>
					</div>
					<button
						transition:fly={{ duration: 500, delay: 1200, y: 300 }}
						use:handleSubmitButton
						class="w-full rounded-lg bg-gradient-to-t from-purple-700 to-purple-500 h-12 mt-4 flex items-center justify-center"
						type="subnit"
					>
						ذخیره
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.mouseover {
		background: linear-gradient(0deg, rgba(255, 252, 177, 0.2), rgba(164, 84, 255, 0.2));
		transform-style: preserve-3d;
		perspective: 2000px;
		transform: translate(var(--X), var(--Y));
		transition: all 0.2s linear;
		animation: backdrop 3s linear infinite alternate;
	}
	.card {
		transform-style: preserve-3d;
		perspective: 1000px;
		transition: all 0.2s linear;
	}

	@keyframes backdrop {
		0% {
			border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
		}
		25% {
			border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
		}
		50% {
			border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
		}
		75% {
			border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
		}
		100% {
			border-radius: 45% 50% 38% 58% / 50% 40% 52% 47%;
		}
	}
</style>
