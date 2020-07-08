<template>
    <footer v-if="show">
        <div class="newsletter" data-aos="fade-up">
            <h1>Let's stay in touch</h1>
            <p>Get our latest promotions straight to your inbox !</p>
            <input type="text" placeholder="Email address">
            <button>Subscribe</button>
        </div>

        <div class="sitemap">
            <ul>
                <li><router-link class="link" :to="{ name: 'home', }">Home</router-link></li>
                <li v-for="category in menus" :key="category.id"><a class="link" :href="'#/shop/' + category['slug']">{{ category['name'] }}</a></li>
                <li><router-link class="link" :to="{ name: 'explore', }">Explore</router-link></li>
                <li><a class="link" href="#">About Us</a></li>
            </ul>
        </div>

        <div class="contact">
            <h2>Outline</h2>
            <ul class="socials">
                <li><img src="images/facebook.png"/></li>
                <li><img src="images/instagram.png"/></li>
                <li><img src="images/twitter.png"/></li>
            </ul>
            <span><a class="link" href="mailto:infos@outline.com">infos@outline.com</a></span>
            <p class="contact-infos">
                4461 René-Lévesque Blvd<br/>
                Montreal<br/>
                Québec<br/>
                H3B 4W8
            </p>
            <span class="contact-infos">514-996-1055</span>
        </div>

        <div class="legal">
            <span class="legal-infos"><a href="#">Privacy Policy</a> | <a href="#">User Agreement</a></span>
        </div>
    </footer>
</template>

<script>
import '../assets/css/footer.scss'

export default {
    name: 'Footer',
    data() {
        return {
            menus: [],
            show: false,
        }
    },
    created() {
        this.fetchCategories();
    },
    methods: {
        delayDisplay() {
            this.show = false;
            setTimeout(() => {
                this.show = true;
            }, 1500)
        },
        fetchCategories() {
            var that = this;
            this.$http.get('/api/categories').
            then(function(response) {
                that.menus = response.data.categories;
            });
        },
    },
    mounted() {
        this.delayDisplay();
    },
    watch: {
        '$route'() {
            this.delayDisplay();
        }
    },
}
</script>
