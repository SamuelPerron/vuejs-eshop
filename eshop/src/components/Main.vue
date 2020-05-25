<template>
    <div id="main">

    </div>
</template>

<script>

export default {
    name: 'Main',
    components: {

    },
    data() {
        return {
            products: [],
        };
    },
    created() {
        this.fetchProducts();
    },
    methods: {
        fetchProducts() {
            var that = this;
            this.$http.get('/api/products').
            then(function(response) {
                that.products = response.data.products;
            });
        }
    }
}
</script>
