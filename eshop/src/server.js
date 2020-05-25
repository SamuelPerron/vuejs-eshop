import { Server } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {

    let server = new Server({
        environment,
        routes() {
            this.namespace = 'api'

            this.get('/products', () => {
                return {
                    'products': []
                }
            })
        },
    })

    return server
}
