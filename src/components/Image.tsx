import { getImage } from "astro:assets";

export const Image = async () => {
	const image = await getImage({
		src: "https://i.imgur.com/woCxpkj.jpg",
		inferSize: true,
	});

	return <img src={image.src} srcSet={image.srcSet.attribute} />;
};
