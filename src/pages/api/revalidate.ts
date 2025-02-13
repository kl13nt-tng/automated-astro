import { REVALIDATION_TOKEN } from "astro:env/server";
import { purgeCache } from "@netlify/functions";
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async (request) => {
	const { searchParams } = new URL(request.url);
	const token = searchParams.get("token");
	const tag = searchParams.get("tag");

	if (token !== REVALIDATION_TOKEN) {
		return new Response("Unauthorized", { status: 401 });
	}

	if (!tag) {
		return new Response("Missing tag", { status: 400 });
	}

	await purgeCache({ tags: [tag] });

	return new Response(`Revalidated entry with tag ${tag}`, {
		status: 200,
	});
};
