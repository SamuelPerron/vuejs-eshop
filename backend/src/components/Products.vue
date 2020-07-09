<template>
    <div class="products">
        <Table :headers="productsHeaders" :items="products" modelName="Product" @delete="deleteProducts"/>
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
            this.products = [];
            var that = this;
            this.$http.get(constants.apiUrl + 'products').
            then(function(response) {
                var data = response.data.products;
                for (var i = 0; i < data.length; i++) {
                    that.products.push([data[i]['id'], data[i]['name'], 'Men', 'Tees']);
                }
            });
        },
        deleteProducts(id) {
            var formData = new FormData();
            formData.set('id', id);
            var that = this;
            var url = constants.apiUrl + 'product/delete/';
            this.$http.post(url, formData)
            .then(function() {
                that.fetchProducts();
            })
        }
    }
}
</script>
