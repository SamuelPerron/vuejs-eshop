<template>
    <div class="menu">
        <div class="menu-dim" :class="{open: isOpen}"></div>

        <div class="menu-top">
            <h1>Outline</h1>
            <ul>
                <li v-for="categorie in menus" :key="categorie.id" :class="{open: isOpen}" v-on:click="openMenu(categorie['id'])">{{ categorie['name'] }}</li>
                <li :class="{open: isOpen}" v-on:click="openMenu('explore')">Explore</li>
                <li :class="{open: isOpen}" v-on:click="openMenu('search')">
                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                        <path d="M22 20L20 22 14 16 14 14 16 14z"/>
                        <path class="hide" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="1.5" d="M9 3A6 6 0 1 0 9 15A6 6 0 1 0 9 3Z"/>
                    </svg>
                </li>
                <li :class="{open: isOpen}" v-on:click="openMenu('cart')">
                    <svg height="24px" viewBox="0 -31 512.00026 512" width="24px" xmlns="http://www.w3.org/2000/svg">
                        <path d="m164.960938 300.003906h.023437c.019531 0 .039063-.003906.058594-.003906h271.957031c6.695312 0 12.582031-4.441406 14.421875-10.878906l60-210c1.292969-4.527344.386719-9.394532-2.445313-13.152344-2.835937-3.757812-7.269531-5.96875-11.976562-5.96875h-366.632812l-10.722657-48.253906c-1.527343-6.863282-7.613281-11.746094-14.644531-11.746094h-90c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h77.96875c1.898438 8.550781 51.3125 230.917969 54.15625 243.710938-15.941406 6.929687-27.125 22.824218-27.125 41.289062 0 24.8125 20.1875 45 45 45h272c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-272c-8.269531 0-15-6.730469-15-15 0-8.257812 6.707031-14.976562 14.960938-14.996094zm312.152343-210.003906-51.429687 180h-248.652344l-40-180zm0 0"/>
                        <path d="m150 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/>
                        <path d="m362 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/>
                    </svg>
                </li>
            </ul>
        </div>

        <div class="menu-container" :class="{open: isOpen, close: isClose}">
            <div v-if="actualSubMenu != null && actualMenu != 'search' && actualMenu != 'cart'" class="sub-menu">
                <ul>
                    <li :class="{open: actualSubMenu['isOpen'], close: actualSubMenu['isClose']}" v-for="menu in actualSubMenu['items']" :key="menu.id">
                        {{ menu['name'] }}
                        <div class="bottom">
                            <div class="left">
                                <img :src="'images/' + menu['image']">
                            </div>
                            <div class="right">
                                <h4>{{ menu['name'] }}</h4>
                                <p>{{ menu['description'] }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="actualSubMenu != null && actualMenu == 'search'" class="sub-menu search">
                <input type="text" v-on:keyup="searchProducts" :class="{open: actualSubMenu['isOpen'], close: actualSubMenu['isClose']}" v-model="search"/>
                <button v-on:click="reset" :class="{open: actualSubMenu['isOpen'], close: actualSubMenu['isClose']}">X</button>
                <ul>
                    <li v-for="result in results" :key="result.id">
                        {{ result['name'] }}
                        <div class="infos">
                            <div class="left">
                                <img :src="'images/products/' + result['image']">
                            </div>
                            <div class="right">
                                <p>{{ result['description'] }}</p>
                                <strong>${{ result['price'] }}</strong>
                            </div>
                        </div>
                    </li>
                    <li class="no-results" v-if="noResults">No results for this.</li>
                </ul>
            </div>
            <div v-if="actualSubMenu != null && actualMenu == 'cart'" class="sub-menu cart">
                <span v-if="!cart">Your shopping cart is empty.</span>
                <ul v-else="">
                    <li :class="{open: actualSubMenu['isOpen'], close: actualSubMenu['isClose']}" v-for="item in cart['items']" :key="item.id">
                        {{ item['name'] }}
                        <div class="infos">
                            <div class="left">
                                <img :src="'images/products/' + item['image']">
                            </div>
                            <div class="right">
                                <span class="quantity">Qty: {{ item['quantity'] }}</span>
                                <span class="size">Size: {{ item['size'] }}</span>
                                <strong>${{ item['price'] }}</strong>
                            </div>
                        </div>
                    </li>
                </ul>
                <div :class="{open: actualSubMenu['isOpen'], close: actualSubMenu['isClose']}" class="subtotal">
                    <div>
                        <span>Subtotal</span>
                        <span>${{ cart['subtotal'] }}</span>
                    </div>
                    <button>Checkout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/css/menu.scss';

export default {
    name: 'Menu',
    data() {
        return {
            isOpen: false,
            isClose: false,
            actualMenu: null,
            actualSubMenu: null,
            menus: [],
            search: '',
            results: [],
            noResults: false,
            cart: null,
        }
    },
    created() {
        this.fetchCategories();
        this.fetchCart();
    },
    methods: {
        fetchCart() {
            var that = this;
            this.$http.get('/api/cart').
            then(function(response) {
                that.cart = response.data.cart;
            });
        },
        reset() {
            this.results = [];
            this.noResults = false;
            this.search = '';
        },
        searchProducts() {
            this.results = [];
            this.noResults = false;
            if (this.search != '' || this.search != ' ') {
                console.log(this.search);
                var that = this;
                this.$http.get('/api/products?name=' + encodeURIComponent(this.search) + '&limit=3').
                then(function(response) {
                    that.results = response.data.products;
                    if (that.results.length == 0){
                        that.noResults = true;
                    }
                    that.$forceUpdate();
                });
            }
        },
        fetchCategories() {
            var that = this;
            this.$http.get('/api/categories').
            then(function(response) {
                that.menus = response.data.categories;
            });
        },
        openMenu(menu) {
            if (this.isOpen) {
                if (this.actualMenu == menu) {
                    this.isOpen = false;
                    this.isClose = true;
                    this.actualMenu = null;
                    this.actualSubMenu = null;
                } else {
                    this.actualSubMenu['isOpen'] = false;
                    this.actualSubMenu['isClose'] = true;
                    this.$forceUpdate();
                    setTimeout(() => {
                        this.actualMenu = menu;
                        this.openSubMenu();
                    }, 300);
                }
            } else {
                this.isOpen = true;
                this.isClose = false;
                this.actualMenu = menu;
                this.openSubMenu();
            }
        },
        openSubMenu() {
            this.actualSubMenu = null;
            if (this.actualMenu == 'explore') {
                console.log();
            } else if (this.actualMenu == 'search' || this.actualMenu == 'cart') {
                this.actualSubMenu = {};
                this.actualSubMenu['isClose'] = false;
                this.actualSubMenu['isOpen'] = true;
            } else {
                for (var i = 0; i < this.menus.length; i++) {
                    if (this.menus[i]['id'] == this.actualMenu) {
                        this.actualSubMenu = this.menus[i];
                    }
                }
                this.actualSubMenu['isClose'] = false;
                this.actualSubMenu['isOpen'] = true;
            }
        }
    },
}
</script>
