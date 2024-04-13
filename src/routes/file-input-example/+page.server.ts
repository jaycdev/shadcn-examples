import type { Actions, PageServerLoad } from './$types';
import { fail, superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const fileSchema = z
	.instanceof(File, { message: 'Please upload a file.' })
	.refine((file) => file.size < 1024 * 1024, 'File must be less than 1MB.');

const schema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters long.'),
	file: fileSchema,
	files: z.array(fileSchema)
});

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(schema))
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		console.log(form);

		if (!form.valid) {
			return fail(400, {form})
		}

		return { form: withFiles(form) };
	}
} satisfies Actions;
