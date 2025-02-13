import { shared } from "@it-astro:request-nanostores";
import { map } from "nanostores";

export type UserProfile = {
	id: number;
	name: string;
	username: string;
	email: string;
	phone: string;
	website: string;
};

export type UserStore = {
	user: UserProfile | null;
};

export const userStore = shared(
	"userStore",
	map<UserStore>({
		user: null,
	})
);
