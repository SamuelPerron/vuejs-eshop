<template>
    <div class="form">
        <router-link :to="{ name: 'products' }">Back to list</router-link>
        <br/><h1 v-if="!edit">New Product</h1> <h1 v-else="">Edit : <span>{{ product.name }}</span></h1>
        <span class="confirmation" :class="{ 'show-confirmation': saved }">Saved !</span>
        <span class="error" :class="{ 'show-confirmation': error }">Error !</span>
        <div class="container">
            <ul class="page-menu">
                <li v-on:click="goToPage(1)">Informations</li>
                <li v-on:click="goToPage(2)">Inventory / Sale</li>
            </ul>
            <div class="page" :class="{ 'actual': page == 1 }">
                <div class="group">
                    <label for="name">Name</label>
                    <input class="required" type="text" v-model="form['name']" name="name"/>
                </div>
                <div class="side-by-side">
                    <div class="group">
                        <label for="description">Description</label>
                        <textarea v-model="form['description']" name="description"/>
                    </div>
                    <div class="group">
                        <label for="shortDescription">Short description</label>
                        <textarea v-model="form['short_description']" name="shortDescription"/>
                    </div>
                </div>
                <div class="side-by-side">
                    <div class="group">
                        <div class="group">
                            <label for="image">Image</label>
                            <input type="file" ref="image" v-on:change="handleImageUpload" name="image"/><br/>
                            <img class="preview" :src="product.image" v-if="product && product.image">
                        </div>
                        <div class="group" v-if="product && product.image">
                            <label for="del_image"><img src="../assets/images/delete.png"/></label>
                            <input type="checkbox" v-model="form['del_image']" name="del_image"/>
                        </div>
                    </div>

                    <div class="group">
                        <div class="group">
                            <label for="banner">Banner</label>
                            <input type="file" ref="banner" v-on:change="handleBannerUpload" name="banner"/><br/>
                            <img class="preview" :src="product.banner" v-if="product && product.banner">
                        </div>
                        <div class="group" v-if="product && product.banner">
                            <label for="del_banner"><img src="../assets/images/delete.png"/></label>
                            <input type="checkbox" v-model="form['del_banner']" name="del_banner"/>
                        </div>
                    </div>

                    <div class="group">
                        <div class="group">
                            <label for="cutout">Cutout</label>
                            <input type="file" ref="cutout" v-on:change="handleCutoutUpload" name="cutout"/><br/>
                            <img class="preview" :src="product.cutout" v-if="product && product.cutout">
                        </div>
                        <div class="group" v-if="product && product.cutout">
                            <label for="del_banner"><img src="../assets/images/delete.png"/></label>
                            <input type="checkbox" v-model="form['del_cutout']" name="del_banner"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="page" :class="{ 'actual': page == 2 }">
                <div class="side-by-side">
                    <div class="group">
                        <label for="base_price">Base Price</label>
                        <input type="text" v-model="form['base_price']" name="base_price"/>
                    </div>
                    <div class="group">
                        <label for="inventory">Total quantity in inventory</label>
                        <input type="text" v-model="form['inventory']" name="inventory"/>
                    </div>
                </div>

                <div class="one-to-many">
                    <h3>{{ settings.variant_name_plural }}</h3>
                    <span class="new" v-on:click="addVariant">Add new +</span>
                    <ul>
                        <li v-for="(variant, i) in form['variants']" v-bind:key="variant.id">
                            <div class="group">
                                <label for="name">Name</label>
                                <input type="text" class="required" v-model="form['variants'][i]['name']" name="name"/>
                            </div>
                            <div class="group">
                                <label for="price_modificator">Price Modificator</label>
                                <input type="text" v-model="form['variants'][i]['price_modificator']" name="price_modificator"/>
                            </div>
                            <div class="group">
                                <label for="inventory">Quantity in inventory</label>
                                <input type="text" v-model="form['variants'][i]['inventory']" name="inventory"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-actions">
                <button v-on:click="save">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/css/product.scss'

import constants from '../constants.js'

export default {
    name: 'Product',
    data() {
        return {
            'product': null,
            'form': {
                'name': '',
                'description': '',
                'short_description': '',
                'base_price': '',
                'inventory': '',
                'image': '',
                'del_image': '',
                'banner': '',
                'del_banner': '',
                'cutout': '',
                'del_cutout': '',
                'variants': [],
            },
            'page': 1,
            'saved': false,
            'error': false,
            'edit': false,
            'settings': null,
        }
    },
    created() {
        if (this.$route.params.id != 'new') {
            this.edit = true;
            this.fetchProduct();
        }
        this.fetchSettings();
    },
    methods: {
        goToPage(id) {
            this.page = id;
        },
        handleImageUpload() {
            this.form['image'] = this.$refs.image.files[0];
        },
        handleBannerUpload() {
            this.form['banner'] = this.$refs.banner.files[0];
        },
        handleCutoutUpload() {
            this.form['cutout'] = this.$refs.cutout.files[0];
        },
        fetchSettings() {
            var that = this;
            this.$http.get(constants.apiUrl + 'products/settings/').
            then(function(response) {
                that.settings = response.data.settings;
            });
        },
        fetchProduct() {
            var that = this;
            this.$http.get(constants.apiUrl + 'product/' + this.$route.params.id).
            then(function(response) {
                that.product = response.data.product;
                if (response.data.product.image) {
                    that.product.image = constants.apiUrl + response.data.product.image;
                }
                if (response.data.product.banner) {
                    that.product.banner = constants.apiUrl + response.data.product.banner;
                }
                if (response.data.product.cutout) {
                    that.product.cutout = constants.apiUrl + response.data.product.cutout;
                }
                that.form['name'] = response.data.product.name;
                that.form['description'] = response.data.product.description;
                that.form['short_description'] = response.data.product.short_description;
                that.form['price'] = response.data.product.price;
                that.form['inventory'] = response.data.product.inventory;
                that.form['variants'] = response.data.product.variants;
            });
        },
        addVariant() {
            this.form['variants'].push({
                'id': 0,
                'name': '',
                'price_modificator': 0,
                'inventory': 0,
                'product_id': '',
            })
        },
        save() {
            this.saved = false;
            this.error = false;

            var formData = new FormData();
            for (var key in this.form) {
                formData.set(key, this.form[key]);
            }
            var that = this;
            var url = '';
            if (this.edit) {
                url = constants.apiUrl + 'product/' + this.product.id;
            } else {
                url = constants.apiUrl + 'product/new/';
            }
            this.$http.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(function(response) {
                that.saved = true;
                if (!that.edit) {
                    that.product = {};
                    that.product.name = that.form['name'];
                    that.edit = true;
                    that.product = response.data['product'];
                    that.$router.push('/product/' + that.product.id);
                }

                for (var i = 0; i < that.form['variants'].length; i++) {
                    var formDataVariant = new FormData();
                    that.form['variants'][i]['product_id'] = that.product.id;
                    for (var key in that.form['variants'][i]) {
                        formDataVariant.set(key, that.form['variants'][i][key]);
                    }

                    var variantUrl = '';
                    if (that.form['variants'][i]['id']) {
                        variantUrl = constants.apiUrl + 'variant/' + that.form['variants'][i].id;
                    } else {
                        variantUrl = constants.apiUrl + 'variant/new/';
                    }

                    that.$http.post(variantUrl, formDataVariant)
                    .then(function() {
                        that.saved = true;
                        that.fetchProduct();
                    })
                    .catch(function() {
                        that.error = true;
                    });
                }
                that.fetchProduct();
            })
            .catch(function() {
                that.error = true;
            });
        }
    },
    watch: {
        form: {
            handler() {
                this.error = false;
                this.saved = false;
            },
            deep: true
        }
    }
}
</script>
