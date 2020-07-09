<template>
    <div class="products">
        <Table :headers="productsHeaders" :items="products" modelName="Product" :filters="filters"/>
    </div>
</template>

<script>
import '../assets/css/products.scss'
import Table from './Table.vue'
import constants from '../constants.js'

export default {
    name: 'Products',
    components: {
        Table,
    },
    data() {
        return {
            'productsHeaders': ['Name', 'Category', 'Sub-category'],
            'products': [],
        }
    },
    created() {
        this.fetchProducts();
    },
    methods: {
        fetchProducts() {
            var that = this;
            this.$http.get(constants.apiUrl + 'products').
            then(function(response) {
                var data = response.data.products;
                for (var i = 0; i < data.length; i++) {
                    that.products.push([data[i]['id'], data[i]['name'], 'Men', 'Tees']);
                }
            });
        }
    }
}
</script>
