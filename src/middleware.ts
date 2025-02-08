import type { MiddlewareHandler } from "astro";
import { cache } from "../page-cache";

export const onRequest: MiddlewareHandler = async (req, next) => {
	return next();

	if (import.meta.env.DEV) {
		return next();
	}

	console.log("[Middleware] onRequest", req.url.pathname);
	const path = req.url.pathname;
	const cached = cache.get(path);

	if (cached) {
		console.log(`Returned cached response for ${path}`);
		return cached.response.clone();
	}

	console.log(`Rendering ${path}`);
	const response = await next();

	cache.set(path, {
		response: response.clone(),
	});

	return response;
};
