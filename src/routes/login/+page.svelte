<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Snapshot } from '@sveltejs/kit';

	let username: string;
	let password: string;

	export const snapshot: Snapshot<{ username: string; password: string }> = {
		// runs when we navigate away from page
		capture: () => {
			// return needs to be JSON serializable
			return {
				username,
				password
			};
		},
		// runs to restore the data
		restore: (values) => {
			username = values.username;
			password = values.password;
		}
	};

	const login = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		});

		const json = await response.json();

		if (response.ok) {
			goto('/', { invalidateAll: true });
		} else {
			alert(json.message);
		}
	};
</script>

<form on:submit|preventDefault={login}>
	<label for="username"> Username </label>

	<input
		type="text"
		id="username"
		name="username"
		placeholder="Type your username..."
		bind:value={username}
	/>

	<br />

	<label for="password"> Password </label>

	<input
		type="text"
		id="password"
		name="password"
		placeholder="Type your password..."
		bind:value={password}
	/>

	<br />
	<br />

	<button type="submit">Login</button>
</form>
