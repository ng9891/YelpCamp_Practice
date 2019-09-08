/* eslint-disable indent */
// const mongoose = require('mongoose');
const Campground = require("./models/campground");
const Comments = require("./models/comments");

const seed = [{
		name: "Salmon Creek",
		image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.",
	},
	{
		name: "Trout Stew Hill",
		image: "https://cdn.pixabay.com/photo/2015/06/09/13/44/world-jamboree-803544_960_720.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.",
	},
	{
		name: "Mountain Tigers",
		image: "https://cdn.pixabay.com/photo/2019/07/31/03/09/tent-4374219_960_720.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.",
	},
	{
		name: "Extra Hill",
		image: "https://cdn.pixabay.com/photo/2016/06/06/08/32/tent-1439061_960_720.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.",
	},
	{
		name: "Diz Mountain",
		image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_960_720.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.",
	},
	{
		name: "Pixie Bay",
		image: "https://live.staticflickr.com/7169/6401974259_459a877dd4_b.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.",
	},
	{
		name: "Beverly Camp",
		image: "https://live.staticflickr.com/5220/5521979344_c5e5970bc3_b.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.",
	},
];


async function seedDb() {
	try {
		await Comments.deleteMany({});
		await Campground.deleteMany({});

		// for (const camp of seed) {
		// 	const campground = await Campground.create(camp);

		// 	const comment = await Comments.create({
		// 		text: "This is good but need internet.",
		// 		author: "Diz NtZ",
		// 	});

		// 	campground.comments.push(comment);
		// 	campground.save();
		// }
	} catch (err) {
		console.log(err);
	}
}

module.exports = seedDb;