import { defineCollection, z } from "astro:content";

import { graphql } from "gql.tada";
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs";
import { readFragment } from "gql.tada";

const client = new ApolloClient({
	uri: "https://spacex-production.up.railway.app",
	cache: new InMemoryCache(),
});

const rockets = defineCollection({
	type: "content_layer",
	loader: async () => {
		const RocketFragment = graphql(`
			fragment RocketFragment on Rocket {
				engines {
					propellant_1
					propellant_2
					version
				}
				id
				description
				name
			}
		`);

		const query = graphql(
			`
				query RocketsQuery($limit: Int) {
					rockets(limit: $limit) {
						...RocketFragment
					}
				}
			`,
			[RocketFragment]
		);

		const { data } = await client.query({
			query,
			variables: { limit: 5 },
		});

		if (!data.rockets) {
			return [];
		}

		const mapped = data.rockets
			.map((rocketFragment) => {
				const rocket = readFragment(RocketFragment, rocketFragment);

				if (!rocket) {
					return null;
				}

				return {
					...rocket,
					id: rocket.id!,
				};
			})
			.filter((item) => item !== null);

		return mapped;
	},
	schema: z.object({
		id: z.string(),
		description: z.string(),
		name: z.string(),
		engines: z.object({
			propellant_1: z.string(),
			propellant_2: z.string(),
			version: z.string(),
		}),
	}),
});

export const collections = { rockets };
