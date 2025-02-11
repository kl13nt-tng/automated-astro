import { useStore } from "@nanostores/react";
import { userStore } from "~/stores/user";

export const NavUser = () => {
	const userStoreStore = useStore(userStore, {});

	if (!userStoreStore.user) return;

	return (
		<a
			className="hover:border-0"
			key={userStoreStore.user.name}
			href="/profile"
		>
			{userStoreStore.user.name}
		</a>
	);
};
