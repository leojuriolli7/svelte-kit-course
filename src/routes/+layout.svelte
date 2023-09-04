<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	export let data;

	$: getPageTitle = () => {
		const title = $page.data?.title;
		if (title) return `Website Title - ${title}`;

		return 'Website Title';
	};
</script>

<svelte:head>
	<title>{getPageTitle()}</title>

	{#if $page.data?.description}
		<meta name="description" content={$page.data.description} />
	{/if}
</svelte:head>

<form action="/search" method="GET">
	<input name="q" />
</form>

<nav>
	<a href="/"> Home</a>
	<a href="/products"> Products</a>

	{#if !data.user}
		<a href="/login"> Login</a>
	{/if}

	{#if !!data.user}
		<form action="/login?/logout" method="POST" use:enhance>
			<button type="submit">Logout</button>
		</form>
	{/if}
</nav>

<main>
	{#if data.user}
		<p>Logged in as {data.user.name}</p>
	{/if}

	<slot />

	{#if !data.user}
		<h2>Layout form test</h2>
		<form
			method="POST"
			action="/login?/login&redirectTo={$page.url.pathname}"
			use:enhance={() => {
				// runs after action request is done
				return ({ result, update }) => {
					if (result.type === 'failure') {
						// `applyAction` on result `failure` will set
						// the $page.form data to be `result.data`, meaning
						// we can access the validation errors returned in the action.
						applyAction(result);
					} else {
						update();
					}
				};
			}}
		>
			<label for="username"> Username </label>

			<input type="text" id="username" name="username" placeholder="Type your username..." />

			{#if $page.form?.usernameMissing}
				<p style:color="red">Required</p>
			{/if}

			<br />

			<label for="password"> Password </label>

			<input type="text" id="password" name="password" placeholder="Type your password..." />

			{#if $page.form?.passwordMissing}
				<p style:color="red">Required</p>
			{/if}

			<br />
			<br />

			<button type="submit">Login</button>
		</form>
	{/if}
</main>

<style>
	main {
		padding: 32px;
	}
</style>
