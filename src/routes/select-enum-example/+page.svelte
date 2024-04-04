<script lang="ts">
	import {
		Select,
		SelectValue,
		SelectTrigger,
		SelectContent,
		SelectItem,
		SelectInput
	} from '$lib/components/ui/select';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import {
		FormButton,
		FormField,
		FormFieldErrors,
		FormLabel,
		FormControl
	} from '$lib/components/ui/form/index.js';
	import { colors } from './schema';

	export let data: PageData;

	const form = superForm(data.form);
	const { form: formData, enhance } = form;
	$: selectedColor = {
		label: colors[$formData.color],
		value: $formData.color
	};
</script>

<div class="max-w-lg">
	<form method="post" use:enhance class="mb-6">
		<FormField {form} name="color">
			<FormControl let:attrs>
				<FormLabel>Color</FormLabel>
				<Select selected={selectedColor} onSelectedChange={(s) => s && ($formData.color = s.value)}>
					<SelectInput name={attrs.name} />
					<SelectTrigger {...attrs}>
						<SelectValue placeholder="Select a color" />
					</SelectTrigger>
					<SelectContent>
						{#each Object.entries(colors) as [value, label]}
							<SelectItem {value} {label} />
						{/each}
					</SelectContent>
				</Select>
				<FormFieldErrors />
			</FormControl>
		</FormField>
		<FormButton class="mt-6">Submit</FormButton>
	</form>

	<SuperDebug data={$formData} />
</div>
