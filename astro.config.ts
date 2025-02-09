// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";

import vitePluginCheckTodos from "./vite-plugin-check-todos.ts";

import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";

export default defineConfig({
	site: process.env.SITE,
	prefetch: true,
	output: "static",
	integrations: [react(), mdx(), sitemap()],
	image: {
		domains: ["imgur.com", "i.imgur.com"],
	},
	vite: {
		plugins: [vitePluginCheckTodos(), tailwindcss()],
	},
	env: {
		schema: {
			API_URL: envField.string({
				context: "server",
				access: "secret",
				optional: false,
			}),
			REVALIDATION_TOKEN: envField.string({
				context: "server",
				access: "secret",
				optional: false,
			}),
			SITE: envField.string({
				context: "server",
				access: "secret",
				optional: false,
			}),
		},
	},
	adapter: netlify(),
});
