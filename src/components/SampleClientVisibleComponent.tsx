import React, { useState } from "react";

import hiWhoa from "~/assets/hi-whoa.gif";

export const SampleClientVisibleComponent: React.FC = () => {
	const [count, setCount] = useState(0);

	const handleClick = () => {
		setCount(count + 1);
	};

	return (
		<div>
			<img src={hiWhoa.src} alt="whoa" height={hiWhoa.height} />
			<p>Count: {count}</p>
			<button onClick={handleClick}>Increase Counter</button>
		</div>
	);
};
