interface Props {
	file: string;
}

export const OpenInEditor = ({ file }: Props) => {
	return (
		<button onClick={() => fetch(`/__open-in-editor?file=${file}`)}>
			Check it out
		</button>
	);
};
