import { defineCollection, z } from "astro:content";

import { readFragment } from "gql.tada";
import {
	rocketsQuery,
	shipsQuery,
	type RocketFragmentType,
} from "./queries.graphql";
import { apolloClient } from "./apollo-client";

const rockets = defineCollection({
	type: "content_layer",
	loader: async () => {
		const { data } = await apolloClient.query({
			query: rocketsQuery,
			variables: { limit: 500 },
		});

		if (!data.rockets) {
			return [];
		}

		const mapped = data.rockets
			.filter((rocket): rocket is NonNullable<typeof rocket> => rocket !== null)
			.map((fragment) => {
				const rocket = readFragment<RocketFragmentType>(fragment);

				return {
					...rocket,
					id: rocket.id!,
				};
			});

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

const ships = defineCollection({
	type: "content_layer",
	loader: async () => {
		const { data } = await apolloClient.query({
			query: shipsQuery,
			variables: { limit: 10 },
		});

		if (!data.ships) {
			return [];
		}

		const mapped = data.ships
			.filter((ship): ship is NonNullable<typeof ship> => ship !== null)
			.map((ship) => {
				return {
					...ship,
					id: ship.id!,
				};
			});

		return mapped;
	},
	schema: z.object({
		id: z.string(),
		image: z.string().nullable(),
	}),
});

export const collections = { rockets, ships };
