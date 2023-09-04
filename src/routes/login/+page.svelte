<script lang="ts">
	export let form;
</script>

<form method="POST" action="?/login">
	<label for="username"> Username </label>

	<input
		type="text"
		id="username"
		name="username"
		placeholder="Type your username..."
		value={form?.username || ''}
	/>

	{#if form?.usernameMissing}
		<p style:color="red">Required</p>
	{/if}

	<br />

	<label for="password"> Password </label>

	<input
		type="text"
		id="password"
		name="password"
		placeholder="Type your password..."
		value={form?.password || ''}
	/>

	{#if form?.passwordMissing}
		<p style:color="red">Required</p>
	{/if}

	<br />
	<br />

	<button type="submit">Login</button>
</form>
