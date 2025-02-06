// import { rawRequest } from "graphql-request";

/**
 * @type {import('@graphql-codegen/cli').CodegenConfig}
 */
const config = {
	schema: "https://spacex-production.up.railway.app",
	documents: [],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		// "./src/gql/": {
		// 	preset: "client",
		// 	config: {
		// 		documentMode: "string",
		// 		useTypeImports: true, // The updated setting.
		// 	},
		// },
		"./schema.graphql": {
			plugins: ["schema-ast"],
			config: {
				includeDirectives: true,
			},
		},
	},
};

export default config;
