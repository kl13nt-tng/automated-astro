import { cache } from "page-cache";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const path = url.searchParams.get("path");

	if (!path) {
		return new Response("Missing path parameter", { status: 400 });
	}

	try {
		console.log(`Revalidating ${path}`);
		cache.delete(path);

		return new Response("Page revalidated successfully", { status: 200 });
	} catch (error) {
		console.error("Revalidation error:", error);
		return new Response("Revalidation failed", { status: 500 });
	}
}
