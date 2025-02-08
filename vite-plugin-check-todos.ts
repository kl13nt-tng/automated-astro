import type { Plugin } from "vite";
import path from "path";
import fs from "fs";

type PluginOptions = {
	/**
	 * A map of types to their respective terminal colors.
	 */
	typeColors?: Record<string, string>;
	/**
	 * An array of types to check for.
	 */
	types?: string[];
};

const defaultPluginOptions: Required<PluginOptions> = {
	typeColors: {
		TODO: "\x1b[33m",
		FIXME: "\x1b[31m",
	},
	types: ["TODO", "FIXME"],
};

const readFile = async (path: string) => {
	try {
		const contents = await fs.promises.readFile(path, "utf-8");

		return contents;
	} catch (error) {
		return null;
	}
};

export default function vitePluginCheckTodos({
	types,
	typeColors,
} = defaultPluginOptions): Plugin {
	const regex = new RegExp(
		`\/\/\\s*(?<type>${types.join("|")})\\s*:\\s*(?<content>.+)`,
		"gim"
	);

	return {
		name: "vite-plugin-check-todos",

		async load(id) {
			if (id.includes("node_modules")) {
				return null;
			}

			const code = await readFile(id);
			if (!code) return;

			let match: RegExpExecArray | null;

			while ((match = regex.exec(code)) !== null) {
				const relativePath = path.relative(process.cwd(), id);
				const type =
					match.groups?.type.toUpperCase() as keyof typeof typeColors;
				const content = match.groups?.content.trim();
				const color = typeColors[type] ?? "\x1b[0m";
				const reset = "\x1b[0m";

				const time = new Date().toTimeString().split(" ")[0];

				console.warn(
					`${color}${time} [vite-plugin-check-todos] Found ${type} comment in ${relativePath}: ${content}${reset}`
				);
			}

			return null;
		},
	};
}
