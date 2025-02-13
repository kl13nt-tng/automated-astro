import { useStore } from "@nanostores/react";
import { navItemsStore } from "~/stores/nav";

export const NavItems = () => {
	const navItemsStoreValue = useStore(navItemsStore, {});

	if (!navItemsStoreValue.navItems) return;

	return (
		<>
			{navItemsStoreValue.navItems.map((item) => (
				<a key={item} className="hover:border-0">
					{item}
				</a>
			))}
		</>
	);
};
