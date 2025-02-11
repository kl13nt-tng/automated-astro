import { shared } from "@it-astro:request-nanostores";
import { map } from "nanostores";

export type NavItems = string[];
export type NavItemsStore = {
	navItems: NavItems | null;
};

export const navItemsStore = shared(
	"navItemsStore",
	map<NavItemsStore>({
		navItems: null,
	})
);
