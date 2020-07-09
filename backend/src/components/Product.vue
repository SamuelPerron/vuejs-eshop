<template>
    <div class="form">
        <router-link :to="{ name: 'products' }">Back to list</router-link>
        <br/><h1>New Product</h1>
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
            },
            'page': 1,
            'saved': false,
            'error': false,
        }
    },
    methods: {
        goToPage(id) {
            this.page = id;
        },
        save() {
            this.saved = false;
            this.error = false;

            var formData = new FormData();
            for (var key in this.form) {
                formData.set(key, this.form[key]);
            }
            var that = this;
            var url = constants.apiUrl + '/product/new/';
            this.$http.post(url, formData)
            .then(function() {
                that.saved = true;
            })
            .catch(function() {
                that.error = true;
            });
        }
    }
}
</script>
