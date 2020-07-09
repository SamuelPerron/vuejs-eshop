<template>
    <div class="menu">
        <h1><router-link class="link" :to="{ name: 'home', }">Outline</router-link></h1>
        <ul>
            <li><router-link class="link" :to="{ name: 'products', }">Products</router-link></li>
            <li>Categories</li>
            <li>Promotions</li>
            <li>Sales</li>
            <li>Analytics</li>
            <li>CMS</li>
            <li>Settings</li>
        </ul>
    </div>
</template>

<script>
import '../assets/css/menu.scss'

export default {
    name: 'Menu',
}
</script>
