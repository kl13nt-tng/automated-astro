// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
// import graphqlLoader from "vite-plugin-graphql-loader";
// import codegen from "vite-plugin-graphql-codegen";

import node from "@astrojs/node";
import vitePluginCheckTodos from "./vite-plugin-check-todos.ts";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	integrations: [react()],
	vite: {
		plugins: [
			vitePluginCheckTodos(),
			// graphqlLoader(),
			// codegen({
			// 	configFilePathOverride: "./codegen.config.mjs",
			// }),
		],
	},

	adapter: node({
		mode: "standalone",
	}),
});
