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
                        <label for="image">Image</label>
                        <input type="file" ref="image" v-on:change="handleImageUpload" name="image"/>
                        <img class="preview" :src="product.image" v-if="product && product.image">
                    </div>
                    <div class="group" v-if="product && product.image">
                        <label for="del_image"><img src="../assets/images/delete.png"/></label>
                        <input type="checkbox" v-model="form['del_image']" name="del_image"/>
                    </div>
                </div>
            </div>

            <div class="page" :class="{ 'actual': page == 2 }">
                <div class="group">
                    <label for="price">Price</label>
                    <input type="text" v-model="form['price']" name="price"/>
                </div>
                <div class="group">
                    <label for="inventory">Quantity in inventory</label>
                    <input type="text" v-model="form['inventory']" name="inventory"/>
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
                'price': '',
                'inventory': '',
                'image': '',
                'del_image': '',
            },
            'page': 1,
            'saved': false,
            'error': false,
            'edit': false,
        }
    },
    created() {
        if (this.$route.params.id != 'new') {
            this.edit = true;
            this.fetchProduct();
        }
    },
    methods: {
        goToPage(id) {
            this.page = id;
        },
        handleImageUpload() {
            this.form['image'] = this.$refs.image.files[0];
        },
        fetchProduct() {
            var that = this;
            this.$http.get(constants.apiUrl + 'product/' + this.$route.params.id).
            then(function(response) {
                that.product = response.data.product;
                if (response.data.product.image) {
                    that.product.image = constants.apiUrl + response.data.product.image;
                }
                that.form['name'] = response.data.product.name;
                that.form['description'] = response.data.product.description;
                that.form['short_description'] = response.data.product.short_description;
                that.form['price'] = response.data.product.price;
                that.form['inventory'] = response.data.product.inventory;
            });
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
                that.fetchProduct();
            })
            .catch(function() {
                that.error = true;
            });
        }
    }
}
</script>
