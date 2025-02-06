import React from "react";

interface SampleClientRendererComponentProps {
	children: React.ReactNode;
}

export const SampleClientRendererComponent: React.FC<
	SampleClientRendererComponentProps
> = ({ children }) => {
	return <div>{children}</div>;
};
