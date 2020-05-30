<template>
    <div class="alert" v-if="alert != ''">
        <p>{{ alert }}</p>
    </div>
</template>

<script>
import '../assets/css/alert.scss'

export default {
    name: 'Alert',
    data() {
        return {
            'alert': '',
        }
    },
    created() {
        this.fetchAlert();
    },
    methods: {
        fetchAlert() {
            var that = this;
            this.$http.get('/api/alert').
            then(function(response) {
                that.alert = response.data.alert;
            });
        },
    }
}
</script>
