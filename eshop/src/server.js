import { Server, Model } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {

    let server = new Server({
        environment,
        models: {
            product: Model,
        },
        routes() {
            this.namespace = 'api';

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
                    console.log(name);
                    return {
                        'products': all,
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
        },
        seeds(server) {
            server.create('product', {
                id: 1,
                name: 'Green classic tee',
                description: 'Sed nec nulla ut eros imperdiet vehicula vitae porta metus. Donec fermentum pretium egestas.',
                image: 'green-classic.jpg',
                price: 22.99,
                sizes: ['S', 'M', 'X', 'XL'],
                inventory: 9999,
                category: 1,
                subCategory: 1,
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
