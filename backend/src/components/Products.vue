<template>
    <div class="products">
        <Table :headers="productsHeaders" :items="products" modelName="Product" :filters="filters"/>
    </div>
</template>

<script>
import '../assets/css/products.scss'
import Table from './Table.vue'

export default {
    name: 'Products',
    components: {
        Table,
    },
    data() {
        return {
            'productsHeaders': ['Name', 'Category', 'Sub-category'],
            'products': [
                [1, 'Green classic tee', 'Men', 'Tees'],
                [2, 'White classic tee', 'Men', 'Tees'],
            ],
        }
    }
}
</script>
