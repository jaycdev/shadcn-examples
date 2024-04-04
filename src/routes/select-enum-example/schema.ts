import { z } from 'zod';

export const colors = {
	red: "Red",
	green: "Green",
	blue: "Blue",
	yellow: "Yellow",
	purple: "Purple",
	orange: "Orange"
} as const;

type Color = keyof typeof colors;

export const schema = z.object({
	color: z
		.enum(Object.keys(colors) as [Color, ...Color[]])
		.default('' as Color)
});
