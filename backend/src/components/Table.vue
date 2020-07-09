<template>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <div class="table-container">
        <div class="actions">
            <router-link class="new-btn" :to="{ name: 'product', params: { id: 'new'} }"><button>Create new {{ modelName }}</button></router-link>
            <button :disabled="selected.length == 0">Delete</button>
        </div>
        <div class="table">
            <div class="thead tline">
                <div class="cell"></div>
                <div class="cell" v-bind:style="{width: cellWidth + '%'}" v-for="header in headers" v-bind:key="header.id">{{ header }}</div>
                <div class="cell"></div>
            </div>
            <div class="tline" v-for="item in items" v-bind:key="item.id">
                <div class="cell"><span class="select-box" :class="{selected: selected.indexOf(item[0]) >= 0}" v-on:click="select(item[0])"/></div>
                <div class="cell" v-bind:style="{width: cellWidth + '%'}" v-for="(col, i) in item" v-bind:key="col.id" v-if="i > 0">{{ col }}</div>
                <div class="cell"><router-link class="edit-btn" :to="{ name: 'product', params: { id: item[0]} }">Edit</router-link></div>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/css/tables.scss'

export default {
    name: 'Table',
    props: [
        'headers',
        'items',
        'modelName',
        'filters',
    ],
    data() {
        return {
            'selected': [],
        }
    },
    computed: {
        cellWidth: function () {
            return 100 / this.headers.length;
        }
    },
    methods: {
        select(item) {
            var index = this.selected.indexOf(item);
            if (index >= 0) {
                this.selected.splice(index, 1);
            } else {
                this.selected.push(item);
            }
        },
    }
}
</script>
