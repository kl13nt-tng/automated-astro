export type Path = string;
export interface ICachedResponse {
	response: Response;
}

export const cache = new Map<Path, ICachedResponse>();
