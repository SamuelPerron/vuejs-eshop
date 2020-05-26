<template>
    <div class="menu">
        <div class="menu-dim" :class="{open: isOpen}"></div>

        <div class="menu-top">
            <h1>Outline</h1>
            <ul>
                <li :class="{open: isOpen}" v-on:click="openMenu('men')">Men</li>
                <li :class="{open: isOpen}" v-on:click="openMenu('women')">Women</li>
                <li :class="{open: isOpen}" v-on:click="openMenu('explore')">Explore</li>
            </ul>
        </div>

        <div class="menu-container" :class="{open: isOpen, close: isClose}">
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
        }
    },
    methods: {
        openMenu() {
            if (this.isOpen) {
                this.isOpen = false;
                this.isClose = true;
            } else {
                this.isOpen = true;
                this.isClose = false;
            }
        }
    },
}
</script>
