<template>
    <div class="product" v-if="infos != {}">
        <div class="top">
            <div class="left">
                <img :src="'images/products/' + infos['image']">
            </div>
            <div class="right">
                <span v-if="infos['special']">{{ infos['special'] }}</span>
                <div class="title">
                    <h1>{{ infos['name'] }}</h1>
                    <h2>${{ infos['price'] }}</h2>
                </div>
                <Rating :score="infos['rating']" :nb="infos['ratings'].length"/>
                <div class="description" v-html="infos['description']"/>
                <ul class="options">
                    <li>
                        <strong>Size</strong>
                        <select v-model="size">
                            <option v-for="format in infos['sizes']" :key="format.id">{{ format }}</option>
                        </select>
                    </li>
                    <li>
                        <strong>Quantity</strong>
                        <input type="number" v-model="quantity">
                    </li>
                </ul>
                <button v-on:click="addToCart">Add to cart</button>
            </div>
        </div>

        <div class="features">
            <ul>
                <li v-for="feature in infos['features']" :key="feature.id">
                    <img :src="'icons/' + feature['image']">
                    <h4>{{ feature['title'] }}</h4>
                </li>
            </ul>
        </div>

        <div class="banner" :style="parallax"></div>

        <div class="features-pictures">
            <h2>Why you'll love the {{ infos['name'] }}</h2>
            <div v-for="feature in infos['moreFeatures']" :key="feature.id" class="feature">
                <div class="image">
                    <img :src="'images/products/' + feature['image']">
                </div>

                <div class="text" data-aos="fade-left">
                    <h3>{{ feature['title'] }}</h3>
                    <div v-html="feature['description']"/>
                </div>
            </div>
        </div>

        <div class="reviews" v-if="infos['ratings'].length > 0">
            <h2>{{ infos['name'] }} reviews</h2>
            <ul>
                <li class="review" v-for="review in infos['ratings']" :key="review.id">
                    <strong>{{ review['from'] }}</strong>
                    <Rating :score="review['score']"/>
                    <h4>{{ review['title'] }}</h4>
                    <p>{{ review['text'] }}</p>
                </li>
            </ul>
        </div>

        <div class="related-products">
            <h2>Products that would fit well with this</h2>
            <ul>
                <li data-aos="fade-up" v-for="product in infos['relatedProducts']" :key="product.id" v-on:click="shopNow(product['id'])">
                    <div class="container">
                        <div class="image">
                            <img :src="'images/products/' + product['image']">
                        </div>
                        <div class="product-title">
                            <h3>{{ product['name'] }}</h3>
                            <strong>${{ product['price'] }}</strong>
                        </div>
                        <p>{{ product['description'] }}</p>
                    </div>
                    <button>Shop now</button>
                </li>
            </ul>
        </div>

        <div class="shop-features">
            <ul>
                <li v-for="feature in shopFeatures" :key="feature.id">
                    <img :src="'icons/' + feature['image']">
                    <h4>{{ feature['title'] }}</h4>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import '../assets/css/product.scss'
import Rating from './Rating.vue'

export default {
    name: 'Product',
    components: {
        Rating,
    },
    data() {
        return {
            'infos': {},
            'shopFeatures': [],
            'parallax': {},
            'size': 'M',
            'quantity': 1,
        }
    },
    created() {
        this.fetchInfos();
        this.fetchShopFeatures();
    },
    methods: {
        shopNow(id) {
            this.$router.push('/product/' + id);
        },
        fetchInfos() {
            var that = this;
            this.$http.get('/api/product/' + this.$route.params.id).
            then(function(response) {
                that.infos = response.data.product;
                that.parallax['backgroundImage'] = "url('images/products/" + that.infos['banner'] + "')";
                that.$forceUpdate();
            });
        },
        fetchShopFeatures() {
            var that = this;
            this.$http.get('/api/shop/features/').
            then(function(response) {
                that.shopFeatures = response.data.features;
            });
        },
        addToCart() {
            console.log('Add to cart\nSize: ' + this.size + ' x' + this.quantity);
        },
    },
    watch: {
        '$route'() {
            this.fetchInfos();
            this.fetchShopFeatures();
        }
    },
}
</script>
