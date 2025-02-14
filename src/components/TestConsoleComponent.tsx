export const TestConsoleComponent = () => {
	return (
		<button
			onClick={() =>
				console.log(
					"%cI clicked in the client component",
					"color:gold;font-size:4em;"
				)
			}
		>
			Log!
		</button>
	);
};
