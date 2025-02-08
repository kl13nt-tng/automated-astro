import { defineCollection, z } from "astro:content";

import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs";
import { readFragment } from "gql.tada";
import {
	launchesQuery,
	rocketsQuery,
	shipsQuery,
	type RocketFragmentType,
} from "./queries.graphql";
import { getImage } from "astro:assets";
import { API_URL } from "astro:env/server";

const client = new ApolloClient({
	uri: API_URL,
	cache: new InMemoryCache(),
});

const rockets = defineCollection({
	type: "content_layer",
	loader: async () => {
		const { data } = await client.query({
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

const launches = defineCollection({
	type: "content_layer",
	loader: async () => {
		const { data } = await client.query({
			query: launchesQuery,
			variables: { limit: 200 },
		});

		if (!data.launches) {
			return [];
		}

		const mapped = data.launches
			.filter((launch): launch is NonNullable<typeof launch> => launch !== null)
			.map((launch) => {
				return {
					...launch,
					id: launch.id!,
				};
			});

		return mapped;
	},
	schema: z.object({
		id: z.string(),
		details: z.string().nullable(),
		launch_date_local: z.string(),
		launch_date_unix: z.number(),
		launch_date_utc: z.string(),
		mission_name: z.string(),
	}),
});

const ships = defineCollection({
	type: "content_layer",
	loader: async () => {
		const { data } = await client.query({
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

		const promises = mapped.map(async (ship) => {
			if (!ship.image) return ship;

			/**
			 * CMS's usually respond w/ image sizes, which can be passed in to avoid
			 * CLS. I'm assuming values here since the API I'm using only returns links.
			 */
			try {
				const desktopImg = await getImage({
					src: ship.image,
					format: "webp",
					inferSize: true,
					quality: 80,
					widths: [728, 1440, 1920],
				});

				return {
					...ship,
					image: {
						srcSet: desktopImg.srcSet.attribute,
						src: desktopImg.src,
					},
				};
			} catch (error) {
				return ship;
			}
		});

		const resolved = await Promise.all(promises);

		return resolved;
	},
	schema: z.object({
		id: z.string(),
		image: z
			.object({
				srcSet: z.string(),
				src: z.string(),
			})
			.nullable(),
	}),
});

export const collections = { rockets, launches, ships };
