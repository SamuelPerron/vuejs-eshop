<template>
    <div class="menu">
        <div class="menu-icon" v-on:click="iconAnimation" :class="{change: isOpen}">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>

        <div class="menu-container" :class="{open: isOpen}">

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
        }
    },
    methods: {
        iconAnimation() {
            this.isOpen = !this.isOpen;
        },
    },
}
</script>
