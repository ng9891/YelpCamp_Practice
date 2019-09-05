let mongoose = require('mongoose');
let Campground = require("./models/campground");
let Comments = require("./models/comments")

let seed = [{
        name: 'Salmon Creek',
        image: 'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.'
    },
    {
        name: 'Trout Stew Hill',
        image: 'https://cdn.pixabay.com/photo/2015/06/09/13/44/world-jamboree-803544_960_720.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.'
    },
    {
        name: 'Mountain Tigers',
        image: 'https://cdn.pixabay.com/photo/2019/07/31/03/09/tent-4374219_960_720.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.'
    },
    {
        name: 'Extra Hill',
        image: 'https://cdn.pixabay.com/photo/2016/06/06/08/32/tent-1439061_960_720.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.'
    },
    {
        name: 'Diz Mountain',
        image: 'https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_960_720.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.'
    },
    {
        name: 'Pixie Bay',
        image: 'https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c73287ed59048cc5e_340.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.'
    },
    {
        name: 'Beverly Camp',
        image: 'https://pixabay.com/get/55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c73287fdc9f4fc55d_340.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui nisi, molestie eget tellus eget, dignissim rhoncus ante. Ut nec fermentum nisl, et aliquam tortor. Maecenas laoreet dui at enim blandit, sed tincidunt augue dictum. Morbi luctus viverra placerat. Curabitur blandit, ex eget elementum egestas, est mi lacinia dui, vitae lacinia ipsum justo at justo. Proin non eros scelerisque, sodales odio vel, aliquet nulla. Donec nec tellus nec mauris congue elementum. Nulla sed libero libero.'
    }
];


async function seedDb() {
    try {
        await Comments.deleteMany({});
        await Campground.deleteMany({});

        for (let camp of seed) {
            let campground = await Campground.create(camp);

            let comment = await Comments.create({
                text: "This is good but need internet.",
                author: "Diz NtZ"
            });

            campground.comments.push(comment);
            campground.save();

        }
    } catch (err) {
        console.log(err);
    }

}

module.exports = seedDb;