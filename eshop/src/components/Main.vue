<template>
    <div id="main">
        <header style='background-image: url("images/products/green-classic-4.jpg");'>
            <div class="blackout"></div>
            <div class="content">
                <div class="header-block" data-aos="fade-right">
                    <h1>Style Starts with Quality.</h1>
                    <p>Curabitur sit amet ligula vitae purus dictum fringilla.</p>
                    <router-link class="link" :to="{ name: 'explore', }"><button>Explore</button></router-link>
                </div>
                <div class="featured-product" data-aos="fade-left">
                    <img src="images/products/shirt-cutout.png">
                </div>
            </div>
        </header>

        <div class="cta">
            <p>Mauris pellentesque ipsum at odio efficitur varius. Fusce consequat nibh eget neque posuere consectetur.</p>
            <ul>
                <li v-for="feature in shopFeatures" :key="feature.id">
                    <img :src="'icons/' + feature['image']">
                    <h4>{{ feature['title'] }}</h4>
                </li>
            </ul>
        </div>

        <div class="best-sellers">
            <h2>Shop our Best Sellers</h2>
            <div class="products">
                <div class="product" data-aos="fade-up" v-for="product in bestSellers" :key="product.id" v-on:click="goTo(product.id)">
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
    </div>
</template>

<script>
import '../assets/css/homepage.scss'

export default {
    name: 'Main',
    components: {

    },
    data() {
        return {
            products: [],
            shopFeatures: [],
            bestSellers: [],
        };
    },
    created() {
        this.fetchProducts();
        this.fetchShopFeatures();
        this.fetchBestSellers();
    },
    methods: {
        fetchProducts() {
            var that = this;
            this.$http.get('/api/products').
            then(function(response) {
                that.products = response.data.products;
            });
        },
        fetchShopFeatures() {
            var that = this;
            this.$http.get('/api/shop/features/').
            then(function(response) {
                that.shopFeatures = response.data.features;
            });
        },
        fetchBestSellers() {
            var that = this;
            this.$http.get('/api/bestsellers').
            then(function(response) {
                that.bestSellers = response.data.products;
            });
        }
    }
}
</script>
