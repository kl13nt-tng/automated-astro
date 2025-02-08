// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";
import codegen from "vite-plugin-graphql-codegen";
// import graphqlLoader from "vite-plugin-graphql-loader";

import node from "@astrojs/node";
import vitePluginCheckTodos from "./vite-plugin-check-todos.ts";

import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	output: "static",
	integrations: [react(), mdx(), icon(), sitemap()],
	image: {
		domains: ["imgur.com", "i.imgur.com"],
	},
	vite: {
		plugins: [
			// graphqlLoader(),
			codegen({
				configFilePathOverride: "./codegen.config.mjs",
			}),
			vitePluginCheckTodos(),
			tailwindcss(),
		],
	},
	env: {
		schema: {
			API_URL: envField.string({
				context: "server",
				access: "secret",
				optional: false,
			}),
		},
	},
	adapter: node({
		mode: "standalone",
	}),
});
