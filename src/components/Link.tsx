import React from "react";

interface LinkProps {
	href: string;
	children: React.ReactNode;
}

// TODO: fix me
// FIXME: fix me 2
export const Link: React.FC<LinkProps> = ({ href, children }) => {
	return <a href={href}>{children}</a>;
};
