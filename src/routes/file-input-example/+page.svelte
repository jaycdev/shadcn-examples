<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import SuperDebug, { fileProxy, filesProxy, superForm } from 'sveltekit-superforms';
	import { FormControl, FormButton, FormField, FormLabel } from '$lib/components/ui/form';
	import { FormFieldErrors } from '$lib/components/ui/form/index.js';

	export let data;

	const form = superForm(data.form);
	const { form: formData } = form;
	const file = fileProxy(formData, 'file');
	const files = filesProxy(formData, 'files');
</script>

<form method="POST" enctype="multipart/form-data" class="mb-4 space-y-4">
	<FormField {form} name="name">
		<FormControl let:attrs>
			<FormLabel>Name</FormLabel>
			<Input {...attrs} />
			<FormFieldErrors />
		</FormControl>
	</FormField>

	<FormField {form} name="file">
		<FormControl let:attrs>
			<FormLabel>Upload your file</FormLabel>
			<Input {...attrs} type="file" bind:files={$file} />
			<FormFieldErrors />
		</FormControl>
	</FormField>

	<FormField {form} name="files">
		<FormControl let:attrs>
			<FormLabel>Upload your file</FormLabel>
			<Input {...attrs} type="file" bind:files={$files} multiple />
			<FormFieldErrors />
		</FormControl>
	</FormField>
	<FormButton variant="outline">Submit</FormButton>
</form>

<SuperDebug data={formData} />
