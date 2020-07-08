<template>
    <div class="shop">
        <header  data-aos="fade-down">
            <h1>{{ subCategory.longName }}</h1>
            <p>{{ subCategory.description }}</p>
        </header>
        <div class="products">
            <div class="product" data-aos="fade-up" v-for="product in products" :key="product.id" v-on:click="goTo(product.id)">
                <div class="images">
                    <div class="changing">
                        <img class="product-image" :src="'images/products/' + product.image">
                        <img class="product-banner" :src="'images/products/' + product.banner">
                    </div>
                    <img class="product-cutout" :src="'images/products/' + product.cutout">
                </div>
                <div class="informations">
                    <h2>{{ product.name }}</h2>
                    <p>{{ product.shortDescription }}</p>
                    <button>${{ product.price }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/css/shop.scss'

export default {
    name: 'Shop',
    data() {
        return {
            'category': null,
            'subCategory': null,
            'products': [],
        }
    },
    created() {
        this.fetchCategory();
    },
    methods: {
        fetchCategory() {
            var that = this;
            this.$http.get('/api/category/' + this.$route.params.category + '/' + this.$route.params.subCategory).
            then(function(response) {
                that.category = response.data.category;
                that.subCategory = response.data.subCategory;
                that.fetchProducts();
            });
        },
        fetchProducts() {
            var that = this;
            this.$http.get('/api/products?category=' + this.category.id + '&subCategory=' + this.subCategory.id).
            then(function(response) {
                that.products = response.data.products;
            });
        },
        goTo(productId) {
            this.$router.push('/product/' + productId);
        }
    }
}
</script>
