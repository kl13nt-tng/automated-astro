import { defineCollection, z } from "astro:content";

import { readFragment } from "gql.tada";
import {
	rocketsQuery,
	shipsQuery,
	type RocketFragmentType,
} from "./queries.graphql";
import { getImage } from "astro:assets";
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

		// const promises = mapped.map(async (ship) => {
		// 	if (!ship.image) return ship;

		// 	/**
		// 	 * CMS's usually respond w/ image sizes, which can be passed in to avoid
		// 	 * CLS. I'm asking Astro to infer the values here since the API I'm using only returns links.
		// 	 */
		// 	try {
		// 		const desktopImg = await getImage({
		// 			src: ship.image,
		// 			format: "webp",
		// 			inferSize: true,
		// 			quality: 80,
		// 			widths: [728, 1440, 1920],
		// 		});

		// 		return {
		// 			...ship,
		// 			image: {
		// 				srcSet: desktopImg.srcSet.attribute,
		// 				src: desktopImg.src,
		// 			},
		// 		};
		// 	} catch (error) {
		// 		return {
		// 			...ship,
		// 			image: {
		// 				srcSet: ship.image,
		// 				src: ship.image,
		// 			},
		// 		};
		// 	}
		// });

		// const resolved = await Promise.all(promises);

		// return resolved;
	},
	schema: z.object({
		id: z.string(),
		image: z.string().nullable(),
	}),
});

export const collections = { rockets, ships };
