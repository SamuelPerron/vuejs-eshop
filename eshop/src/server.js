import { Server } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {

    let server = new Server({
        environment,
        routes() {
            this.namespace = 'api';

            this.get('/products', () => {
                return {
                    'products': []
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
    });

    return server
}
