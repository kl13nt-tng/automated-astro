import type { Plugin, ResolvedConfig } from "vite";
import path from "path";
import fs from "fs";

// TODO: Add support for custom regex
// TODO: Add support for custom types with colors through profiles.

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

export default function vitePluginCheckTodos({
	types,
	typeColors,
} = defaultPluginOptions): Plugin {
	let config: ResolvedConfig;

	const regex = new RegExp(
		`\/\/\\s*(?<type>${types.join("|")})\\s*:\\s*(?<content>.+)`,
		"gim"
	);

	return {
		name: "vite-plugin-check-todos",

		configResolved(resolvedConfig) {
			config = resolvedConfig;
		},

		async load(id) {
			if (id.includes("node_modules") || !id.startsWith(process.cwd())) {
				return null;
			}

			const code = await fs.promises.readFile(id, "utf-8");

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
