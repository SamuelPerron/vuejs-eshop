import { Server, Model } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {

    let server = new Server({
        environment,
        models: {
            product: Model,
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
                    return {
                        'products': results,
                    }
                }

                if (name == undefined) {
                    return {
                        'products': all,
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
                            console.log(result);
                            break;
                        }
                    }
                    return {
                        'product': result,
                    }
                }
            });

            this.get('/categories', () => {
                return {
                    'categories': [
                        {
                            id: 1,
                            name: 'Men',
                            items: [
                                {name: 'Tees', description: 'Curabitur sit amet ligula vitae purus dictum fringilla.', image: 'tees.jpg'},
                                {name: 'Polos', description: 'Sed sed efficitur velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'polo.jpg'},
                                {name: 'Dress Shirts', description: 'Aliquam eu purus odio. Fusce lacinia sem aliquet risus bibendum sollicitudin.', image: 'shirt.jpg'},
                                {name: 'Sweaters', description: 'In euismod laoreet purus, sit amet ornare felis interdum quis.', image: 'sweater.jpg'},
                                {name: 'Shoes', description: 'Donec facilisis et dolor in eleifend.', image: 'shoes.jpg'},
                            ],
                            isOpen: false,
                            isClose: false,
                        },
                        {
                            id: 2,
                            name: 'Women',
                            items: [
                                {name: 'Tops', description: 'Curabitur sit amet ligula vitae purus dictum fringilla.', image: 'top.jpg'},
                                {name: 'Dresses', description: 'Sed sed efficitur velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'dress.jpg'},
                                {name: 'Jumpsuits & Rompers', description: 'Aliquam eu purus odio. Fusce lacinia sem aliquet risus bibendum sollicitudin.', image: 'romper.jpg'},
                                {name: 'Leggings', description: 'In euismod laoreet purus, sit amet ornare felis interdum quis.', image: 'leggings.jpg'},
                                {name: 'Skirts', description: 'Donec facilisis et dolor in eleifend.', image: 'skirt.jpg'},
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
        },
        seeds(server) {
            server.create('product', {
                id: 1,
                name: 'Green classic tee',
                description: '<p>Sed nec nulla ut eros imperdiet vehicula vitae porta metus. Donec fermentum pretium egestas.</p><ul><li>nulla</li><li>metus</li><li>fermentum</li><li>vitae</li></ul><p>Mauris pellentesque ipsum at odio efficitur varius. Fusce <strong>consequat</strong> nibh eget neque posuere consectetur.</p>',
                image: 'green-classic.jpg',
                banner: 'green-classic-4.jpg',
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
                image: 'white-classic.jpg',
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
                image: 'pink-classic.jpg',
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
                image: 'pacman.jpg',
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
                image: 'work-hard.jpg',
                price: 22.99,
                sizes: ['M',],
                inventory: 99,
                category: 1,
                subCategory: 1,
            });
        }
    });

    return server
}
