import React, { useState } from "react";

export const SampleClientIdleComponent: React.FC = () => {
	const [count, setCount] = useState(0);

	const handleClick = () => {
		setCount(count + 1);
	};

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={handleClick}>Increase Counter</button>
		</div>
	);
};
