import { Server, Model } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {

    let server = new Server({
        environment,
        models: {
            product: Model,
            category: Model,
            subCategory: Model,
        },
        routes() {
            this.namespace = 'api';

            this.get('/cart', () => {
                return {
                    'cart': {
                        nbItem: 3,
                        subtotal: 64.97,
                        items: [
                            {
                                name: 'Green classic tee',
                                image: 'green-classic.jpg',
                                price: 22.99,
                                size: 'M',
                                quantity: 1,
                            },
                            {
                                name: 'White classic tee',
                                image: 'white-classic.jpg',
                                price: 41.98,
                                size: 'M',
                                quantity: 2,
                            }
                        ]
                    }
                }
            });

            this.get('/products', (schema, request) => {
                let name = decodeURIComponent(request.queryParams.name).toLowerCase();
                let category = decodeURIComponent(request.queryParams.category).toLowerCase();
                let subCategory = decodeURIComponent(request.queryParams.subCategory).toLowerCase();
                let limit = request.queryParams.limit;
                let all = schema.products.all()['models'];
                var results = [];
                if (name && name != '' && name != ' ') {
                    for (var i = 0; i < all.length; i++) {
                        if (all[i]['name'].toLowerCase().includes(name)) {
                            results.push(all[i]);
                        }
                        if (limit && results.length == limit) {
                            break;
                        }
                    }
                }

                if (category && category != '' && category != ' ') {
                    for (var j = 0; j < all.length; j++) {
                        if (all[j]['category'] == category) {
                            if (subCategory && subCategory != '' && subCategory != ' ') {
                                if (all[j]['subCategory'] == subCategory) {
                                    results.push(all[j]);
                                }
                            } else {
                                results.push(all[j]);
                            }
                        }
                        if (limit && results.length == limit) {
                            break;
                        }
                    }
                }

                if (name == undefined && category == undefined) {
                    return {
                        'products': all,
                    }
                } else {
                    return {
                        'products': results,
                    }
                }
            });

            this.get('/product/:id', (schema, request) => {
                let id = request.params.id
                let all = schema.products.all()['models'];
                var result = null;
                if (id) {
                    for (var i = 0; i < all.length; i++) {
                        if (all[i]['id'] == id) {
                            result = all[i]['attrs'];
                            break;
                        }
                    }
                    return {
                        'product': result,
                    }
                }
            });

            this.get('/category/:parent/:sub', (schema, request) => {
                let parent = request.params.parent
                let sub = request.params.sub
                let categories = schema.categories.all()['models'];
                let subCategories = schema.subCategories.all()['models'];
                var resultParent = null;
                var resultSub = null;
                if (parent && sub) {
                    for (var i = 0; i < subCategories.length; i++) {
                        if (subCategories[i]['slug'] == sub && categories[i]['slug'] == parent) {
                            resultParent = categories[i]['attrs'];
                            resultSub = subCategories[i]['attrs'];
                            break;
                        }
                    }
                    return {
                        'category': resultParent,
                        'subCategory': resultSub,
                    }
                }
            });

            this.get('/categories', () => {
                return {
                    'categories': [
                        {
                            id: 1,
                            name: 'Men',
                            slug: 'men',
                            items: [
                                {name: 'Tees', slug: 'tees', description: 'Curabitur sit amet ligula vitae purus dictum fringilla.', image: 'tees.jpg'},
                                {name: 'Polos', slug: 'polos', description: 'Sed sed efficitur velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'polo.jpg'},
                                {name: 'Dress Shirts', slug: 'dress-shirts', description: 'Aliquam eu purus odio. Fusce lacinia sem aliquet risus bibendum sollicitudin.', image: 'shirt.jpg'},
                                {name: 'Sweaters', slug: 'sweaters', description: 'In euismod laoreet purus, sit amet ornare felis interdum quis.', image: 'sweater.jpg'},
                                {name: 'Shoes', slug: 'shoes', description: 'Donec facilisis et dolor in eleifend.', image: 'shoes.jpg'},
                            ],
                            isOpen: false,
                            isClose: false,
                        },
                        {
                            id: 2,
                            name: 'Women',
                            slug: 'women',
                            items: [
                                {name: 'Tops', slug: 'tops', description: 'Curabitur sit amet ligula vitae purus dictum fringilla.', image: 'top.jpg'},
                                {name: 'Dresses', slug: 'dresses', description: 'Sed sed efficitur velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'dress.jpg'},
                                {name: 'Jumpsuits & Rompers', slug: 'jumpsuits-and-rompers', description: 'Aliquam eu purus odio. Fusce lacinia sem aliquet risus bibendum sollicitudin.', image: 'romper.jpg'},
                                {name: 'Leggings', slug: 'leggings', description: 'In euismod laoreet purus, sit amet ornare felis interdum quis.', image: 'leggings.jpg'},
                                {name: 'Skirts', slug: 'skirts', description: 'Donec facilisis et dolor in eleifend.', image: 'skirt.jpg'},
                            ],
                            isOpen: false,
                            isClose: false,
                        }
                    ]
                }
            });

            this.get('/shop/features', () => {
                return {
                    'features': [
                        {
                            id: 1,
                            title: 'Secure Checkout',
                            image: 'secure-checkout.png'
                        },
                        {
                            id: 2,
                            title: 'Satisfaction Guarantee',
                            image: 'satisfaction.png'
                        },
                        {
                            id: 3,
                            title: 'Free Returns',
                            image: 'free-returns.png'
                        },
                        {
                            id: 4,
                            title: '30 Day Trial',
                            image: '30-day.png'
                        },
                    ]
                }
            });

            this.get('/alert', () => {
                return {
                    'alert': 'You may experience a delay of 2 to 4 days before shipping'
                }
            });
        },
        seeds(server) {
            server.create('product', {
                id: 1,
                name: 'Green classic tee',
                description: '<p>Sed nec nulla ut eros imperdiet vehicula vitae porta metus. Donec fermentum pretium egestas.</p><ul><li>nulla</li><li>metus</li><li>fermentum</li><li>vitae</li></ul><p>Mauris pellentesque ipsum at odio efficitur varius. Fusce <strong>consequat</strong> nibh eget neque posuere consectetur.</p>',
                shortDescription: 'Sed nec nulla ut eros imperdiet vehicula vitae porta metus. Donec fermentum pretium egestas.',
                image: 'green-classic.jpg',
                banner: 'green-classic-4.jpg',
                cutout: 'shirt-cutout.png',
                rating: 4,
                ratings: [
                    {
                        'score': 4,
                        'title': 'Aenean commodo ullamcorper ullamcorper',
                        'text': 'Aenean commodo ullamcorper ullamcorper. Sed sit amet nisl blandit tellus porttitor elementum.',
                        'date': '2020-05-29',
                        'from': 'Samuel P.'
                    },
                    {
                        'score': 4,
                        'title': 'Aenean commodo ullamcorper ullamcorper',
                        'text': 'Aenean commodo ullamcorper ullamcorper. Sed sit amet nisl blandit tellus porttitor elementum.',
                        'date': '2020-05-23',
                        'from': 'Samuel P.'
                    },
                    {
                        'score': 5,
                        'title': 'Aenean commodo ullamcorper ullamcorper',
                        'text': 'Aenean commodo ullamcorper ullamcorper. Sed sit amet nisl blandit tellus porttitor elementum.',
                        'date': '2020-04-30',
                        'from': 'Samuel P.'
                    },
                ],
                features: [
                    {
                        'title': 'Machine wash',
                        'image': 'machine-wash.png',
                    },
                    {
                        'title': 'Vegan clothing',
                        'image': 'vegan.png',
                    },
                    {
                        'title': 'Cotton',
                        'image': 'cotton.png',
                    },
                    {
                        'title': 'Proudly made in Canada',
                        'image': 'made-in-canada.png',
                    },
                ],
                moreFeatures: [
                    {
                        'title': 'Sed sit amet nisl blandit tellus porttitor elementum',
                        'image': 'green-classic-2.jpg',
                        'description': '<p>Mauris ac venenatis est. Praesent non hendrerit ipsum. Sed dapibus, purus sit amet interdum gravida, turpis erat maximus erat, nec pharetra mi turpis vitae felis.</p>',
                    },
                    {
                        'title': 'Phasellus vel pharetra ante',
                        'image': 'green-classic-3.jpg',
                        'description': '<p>Aenean commodo ullamcorper ullamcorper. Sed sit amet nisl blandit tellus porttitor elementum. Vivamus pulvinar lectus eu interdum porta.</p>',
                    },
                    {
                        'title': 'Orci varius natoque penatibus',
                        'image': 'green-classic-5.jpg',
                        'description': '<p>Aenean metus arcu, consequat ac blandit id, finibus a ante. Sed condimentum quam vitae sollicitudin commodo. Praesent imperdiet, dui non malesuada aliquet, turpis risus consectetur elit, et euismod lectus odio quis leo.</p>',
                    }
                ],
                relatedProducts: [
                    {
                        id: 2,
                        name: 'White classic tee',
                        description: 'Mauris pellentesque ipsum at odio efficitur varius. Fusce consequat nibh eget neque posuere consectetur.',
                        image: 'white-classic.jpg',
                        price: 20.99,
                    },
                    {
                        id: 3,
                        name: 'Pink classic tee',
                        description: 'Duis eleifend aliquam elit ut tristique. Nunc facilisis lacinia felis in semper.',
                        image: 'pink-classic.jpg',
                        price: 20.99,
                    },
                    {
                        id: 4,
                        name: 'Pacman tee',
                        description: 'Nullam interdum, vulputate gravida urna molestie. Ut quis mauris faucibus, ullamcorper dolor in, eleifend nunc. Aliquam erat volutpat.',
                        image: 'pacman.jpg',
                        price: 49.99,
                    },
                ],
                price: 22.99,
                sizes: ['S', 'M', 'X', 'XL'],
                inventory: 9999,
                category: 1,
                subCategory: 1,
                special: 'Free shipping this week'
            });
            server.create('product', {
                id: 2,
                name: 'White classic tee',
                description: 'Mauris pellentesque ipsum at odio efficitur varius. Fusce consequat nibh eget neque posuere consectetur.',
                shortDescription: 'Sed nec nulla ut eros imperdiet vehicula vitae porta metus. Donec fermentum pretium egestas.',
                image: 'white-classic.jpg',
                banner: 'green-classic-4.jpg',
                cutout: 'shirt-cutout.png',
                price: 20.99,
                sizes: ['XS', 'S', 'M', 'X', 'XL'],
                inventory: 9999,
                category: 1,
                subCategory: 1,
            });
            server.create('product', {
                id: 3,
                name: 'Pink classic tee',
                description: 'Duis eleifend aliquam elit ut tristique. Nunc facilisis lacinia felis in semper.',
                shortDescription: 'Sed nec nulla ut eros imperdiet vehicula vitae porta metus. Donec fermentum pretium egestas.',
                image: 'pink-classic.jpg',
                banner: 'green-classic-4.jpg',
                cutout: 'shirt-cutout.png',
                price: 20.99,
                sizes: ['XS', 'S', 'M', 'X'],
                inventory: 9999,
                category: 1,
                subCategory: 1,
            });
            server.create('product', {
                id: 4,
                name: 'Pacman tee',
                description: 'Nullam interdum, vulputate gravida urna molestie. Ut quis mauris faucibus, ullamcorper dolor in, eleifend nunc. Aliquam erat volutpat.',
                shortDescription: 'Sed nec nulla ut eros imperdiet vehicula vitae porta metus. Donec fermentum pretium egestas.',
                image: 'pacman.jpg',
                banner: 'green-classic-4.jpg',
                cutout: 'shirt-cutout.png',
                price: 49.99,
                sizes: ['S', 'M'],
                inventory: 99,
                category: 1,
                subCategory: 1,
            });
            server.create('product', {
                id: 5,
                name: 'Eat right, Work hard, Feel good tee',
                description: 'Maecenas quis nibh risus. Sed euismod neque leo, sed placerat leo scelerisque a. Vestibulum aliquam suscipit augue.',
                shortDescription: 'Sed nec nulla ut eros imperdiet vehicula vitae porta metus. Donec fermentum pretium egestas.',
                image: 'work-hard.jpg',
                banner: 'green-classic-4.jpg',
                cutout: 'shirt-cutout.png',
                price: 22.99,
                sizes: ['M',],
                inventory: 99,
                category: 1,
                subCategory: 1,
            });

            server.create('category', {
                id: 1,
                name: 'Men',
                slug: 'men',
                subCategories: [1, 2, 3, 4, 5],
                // items: [
                //     {name: 'Tees', slug: 'tees', description: 'Curabitur sit amet ligula vitae purus dictum fringilla.', image: 'tees.jpg'},
                //     {name: 'Polos', slug: 'polos', description: 'Sed sed efficitur velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'polo.jpg'},
                //     {name: 'Dress Shirts', slug: 'dress-shirts', description: 'Aliquam eu purus odio. Fusce lacinia sem aliquet risus bibendum sollicitudin.', image: 'shirt.jpg'},
                //     {name: 'Sweaters', slug: 'sweaters', description: 'In euismod laoreet purus, sit amet ornare felis interdum quis.', image: 'sweater.jpg'},
                //     {name: 'Shoes', slug: 'shoes', description: 'Donec facilisis et dolor in eleifend.', image: 'shoes.jpg'},
                // ],
                isOpen: false,
                isClose: false,
            });

            server.create('subCategory', {
                id: 1,
                name: 'Tees',
                longName: 'Men Tees',
                slug: 'tees',
                description: 'Curabitur sit amet ligula vitae purus dictum fringilla.',
                image: 'tees.jpg',
                banner: 'tees-banner.jpg',
                parent: 1,
            });
        }
    });

    return server
}
